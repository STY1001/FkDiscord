/**
 * @name FkDiscord
 * @version 2.0.0
 * @description Remove all annoying garbage from Discord (like Nitro (and his features), Shop, Boost, Quests, Tags and more...)
 * @author STY1001
 * @authorId 1028607912320442410
 * @website https://sty1001.com
 * @source https://github.com/STY1001/FkDiscord
 * @updateUrl https://raw.githubusercontent.com/STY1001/FkDiscord/master/FkDiscord.plugin.js
 */

const { DOM, Logger, UI, Plugins, React } = new BdApi("FkNitro");
const fs = require("fs");
const path = require("path")

// Name of the class to hide elements
const hiddenClassName = "fucked";

const changeLog = {
    "2.0.0": "A very big update, introducing plugin's settings, functional update, class for removing elements and of course, Discord breaking update fix (more is comming, like optimization and feature bypass)",
    "1.2.0": "Fix BetterDiscord 1.13 Update and profile custom theme mode removed",
    "1.1.1": "Server Boost channel button added and feature cut down to fix profile popup removal",
    "1.1.0": "Added removal of profile banner",
    "1.0.2": "Meta update",
    "1.0.1": "Adding updateUrl",
    "1.0.0": "Initial release"
};

let showChangeLogAfterUpdate = true;

const config = {
    removeNitroBtnPrivateMessage: true,
    removeQuestBtnPrivateMessage: true,
    removeShopBtnPrivateMessage: true,
    removeChatGifBtn: true,
    removeBurstReactionPicker: true,
    removeServerTag: true,
    removeGuildBoostTopBanner: true,
    removeServerBoostChannel: true,
    removeActivityInMemberList: true,
    removeNitroTabsSettings: true,
    removeNameplate: true,
    removeAvatarDecoration: true,
    removeProfileTheme: true,
    removeProfileEffect: true,
    removeProfileBanner: true,
    removeNitroQuestBadges: 3,
    removeDisplayNameStyle: true
};

const settingsPanel = [
    {
        type: "category",
        id: "privateMessages",
        name: "Private Messages",
        collapsible: true,
        shown: true,
        settings: [
            { type: "switch", id: "removeNitroBtnPrivateMessage", name: "Remove Nitro Button", note: "Remove Nitro button from private messages list.", value: () => config.removeNitroBtnPrivateMessage },
            { type: "switch", id: "removeQuestBtnPrivateMessage", name: "Remove Quests Button", note: "Remove Quests button from private messages list.", value: () => config.removeQuestBtnPrivateMessage },
            { type: "switch", id: "removeShopBtnPrivateMessage", name: "Remove Shop Button", note: "Remove Shop button from private messages list.", value: () => config.removeShopBtnPrivateMessage },
        ]
    },

    {
        type: "category",
        id: "global",
        name: "Global UI",
        collapsible: true,
        shown: false,
        settings: [
            { type: "switch", id: "removeChatGifBtn", name: "Remove GIF Button", note: "Remove GIF button from chat input.", value: () => config.removeChatGifBtn },
            { type: "switch", id: "removeBurstReactionPicker", name: "Remove Super Reactions", note: "Remove Super Reaction toggle in emoji picker.", value: () => config.removeBurstReactionPicker },
        ]
    },

    {
        type: "category",
        id: "server",
        name: "Servers",
        collapsible: true,
        shown: false,
        settings: [
            { type: "switch", id: "removeGuildBoostTopBanner", name: "Remove Boost Banner", note: "Remove server boost banner from channel list.", value: () => config.removeGuildBoostTopBanner },
            { type: "switch", id: "removeServerBoostChannel", name: "Remove Boost Channel", note: "Remove boost channel button.", value: () => config.removeServerBoostChannel },
            { type: "switch", id: "removeActivityInMemberList", name: "Remove Member Activities", note: "Remove activity section in member list.", value: () => config.removeActivityInMemberList },
        ]
    },

    {
        type: "category",
        id: "settings",
        name: "Settings Pages",
        collapsible: true,
        shown: false,
        settings: [
            { type: "switch", id: "removeNitroTabsSettings", name: "Remove Nitro Tabs", note: "Remove Nitro-related tabs in settings.", value: () => config.removeNitroTabsSettings },
        ]
    },

    {
        type: "category",
        id: "profile",
        name: "User Profiles",
        collapsible: true,
        shown: false,
        settings: [
            { type: "switch", id: "removeNameplate", name: "Remove Nameplates", note: "Remove nameplates from all users.", value: () => config.removeNameplate },
            { type: "switch", id: "removeAvatarDecoration", name: "Remove Avatar Decorations", note: "Remove avatar decorations.", value: () => config.removeAvatarDecoration },
            { type: "switch", id: "removeServerTag", name: "Remove Server Tags", note: "Remove server tags in chat, members lists and users profiles", value: () => config.removeServerTag },

            { type: "switch", id: "removeProfileTheme", name: "Disable Profile Themes", note: "Disable custom themes in profile modals, popups and side panels", value: () => config.removeProfileTheme },

            { type: "switch", id: "removeProfileEffect", name: "Remove Profile Effects", note: "Remove all profile visual effects.", value: () => config.removeProfileEffect },
            { type: "switch", id: "removeProfileBanner", name: "Remove Profile Banners", note: "Remove profile banners everywhere.", value: () => config.removeProfileBanner },
            { type: "switch", id: "removeDisplayNameStyle", name: "Remove Display Name Style", note: "Remove display name style style everywhere", value: () => config.removeDisplayNameStyle },
            {
                type: "dropdown",
                id: "removeNitroQuestBadges",
                name: "Remove Badges",
                note: "Choose which badges should remain visible.",
                value: () => config.removeNitroQuestBadges,
                options: [
                    { label: "Disable", value: false },
                    { label: "Remove All", value: true },
                    { label: "Keep 'Originally Known As'", value: 1 },
                    { label: "Keep HypeSquad Only", value: 2 },
                    { label: "Keep HypeSquad + Originally Known As", value: 3 }
                ]
            }
        ]
    }
]

// Theme detection system. I think there is a way to get it with a BdApi things. Maybe for a future release.
const theme = {
    midnight: ["theme-dark", "theme-midnight", "images-dark"],
    darker: ["theme-dark", "theme-darker", "images-dark"],
    dark: ["theme-dark", "images-dark"],
    light: ["theme-light", "images-light"],
};
let currentTheme = 'null';

// Function to check the current client theme (midnight, darker, dark, light)
function checkClientTheme() {
    var htmlRoot = document.getElementsByTagName('html')[0];
    if (htmlRoot) {
        for (const [themeName, classIds] of Object.entries(theme)) {
            let hasAllClasses = true;
            for (const classId of classIds) {
                if (!htmlRoot.classList.contains(classId)) {
                    hasAllClasses = false;
                    break;
                }
            }
            if (hasAllClasses) {
                currentTheme = themeName;
                break;
            }
        }
    }
}

// #region In Private Messages

// Remove Nitro button in Private Message list
async function removeNitroBtnPrivateMessage() {
    if (!config.removeNitroBtnPrivateMessage) return;
    const dataListItemId = '__nitro';

    var item = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (item) {
        item.classList.add(hiddenClassName);
    }
}

// Remove Quest button in Private Message list
async function removeQuestBtnPrivateMessage() {
    if (!config.removeQuestBtnPrivateMessage) return;
    const dataListItemId = '__quests';

    var item = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (item) {
        item.classList.add(hiddenClassName);
    }
}

// Remove Quest button in Private Message list
async function removeShopBtnPrivateMessage() {
    if (!config.removeShopBtnPrivateMessage) return;
    const dataListItemId = '__shop';

    var item = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (item) {
        item.classList.add(hiddenClassName);
    }
}


// #region Global

// Remove Chat GIF Button in text input area
async function removeChatGifBtn() {
    if (!config.removeChatGifBtn) return;
    const btnClassId = 'c0c49a3e5c8626ac-container';

    var btn = document.getElementsByClassName(btnClassId)[0];
    if (btn) {
        btn.classList.add(hiddenClassName);
    }
}

// Remove Super Reaction toggle in reaction picker
async function removeBurstReactionPicker() {
    if (!config.removeBurstReactionPicker) return;
    const buttonId = '_0d242e583d6053f6-label';

    var div = document.getElementsByClassName(buttonId)[0];
    if (div) {
        div.parentElement.classList.add(hiddenClassName);
    }
}


// #region In Server

// Remove Server Boost in the top of channel list
async function removeGuildBoostTopBanner() {
    if (!config.removeGuildBoostTopBanner) return;
    const bannerClassId = '_0d0f9ddd12a3ace3-container';

    var banner = document.getElementsByClassName(bannerClassId)[0];
    if (banner) {
        banner.classList.add(hiddenClassName);
    }
}

// Remove server boost button in channel list
async function removeServerBoostChannel() {
    if (!config.removeServerBoostChannel) return;
    const boostChannelBtnClassId = '_877f0e9008f12b8d-container';
    var boostChannelBtn = document.getElementsByClassName(boostChannelBtnClassId);
    if (boostChannelBtn) {
        for (var i = 0; i < boostChannelBtn.length; i++) {
            boostChannelBtn[i].classList.add(hiddenClassName);
        }
    }
}

// Remove the useless activity section in servers member list
async function removeActivityInMemberList() {
    if (!config.removeActivityInMemberList) return;
    const activityHeaderClassId = '_095fe51feb41b3bb-headerContainer'; // Header of activities
    var activityHeader = document.getElementsByClassName(activityHeaderClassId)[0];
    if (activityHeader) {
        activityHeader.parentElement.classList.add(hiddenClassName);
    }
    const activityClassId = '_0f2e83213c878a13-container'; // All the activities
    var activity = document.getElementsByClassName(activityClassId);
    if (activity) {
        for (var i = 0; i < activity.length; i++) {
            activity[i].parentElement.parentElement.classList.add(hiddenClassName);
        }
    }
}


// #region In Settings

// Remove Nitro tabs in settings modal
async function removeNitroTabsSettings() {
    if (!config.removeNitroTabsSettings) return;
    /*const nitroFirstTabClassId = 'premiumTab__581ea';                                 // Old method for the old full screen settings
    const separatorClassId = 'separator_aa8da2';
    var nitroFirstTab = document.getElementsByClassName(nitroFirstTabClassId)[0];
    const allNitroTabsClassId = [nitroFirstTab];
    if (nitroFirstTab) {
        let topOk = false;
        let currentElement = nitroFirstTab;
        while (topOk === false) {
            currentElement = currentElement.previousElementSibling;
            if (currentElement) {
                if (!currentElement.className.includes(separatorClassId)) {
                    allNitroTabsClassId.push(currentElement);
                } else {
                    allNitroTabsClassId.push(currentElement);
                    topOk = true;
                }
            }
        }
        let bottomOk = false;
        currentElement = nitroFirstTab;
        while (bottomOk === false) {
            currentElement = currentElement.nextElementSibling;
            if (currentElement) {
                if (!currentElement.className.includes(separatorClassId)) {
                    allNitroTabsClassId.push(currentElement);
                } else {
                    bottomOk = true;
                }
            }
        }
        for (var i = 0; i < allNitroTabsClassId.length; i++) {
            allNitroTabsClassId[i].classList.add(hiddenClassName);
        }
    }*/

    // Verifying if a section contain all the ids to ensure it's a Nitro section
    const nitroTabsDataSettingsSidebarItemsId = ['nitro_panel', 'premium_guild_subscriptions_panel', 'subscriptions_panel', 'gift_panel', 'billing_panel'];
    const sectionClassId = '_409aa1aeee28d5f7-section';
    const sections = document.getElementsByClassName(sectionClassId);
    if (sections) {
        for (var i = 0; i < sections.length; i++) {
            if (sections[i] && sections[i].children.length === (nitroTabsDataSettingsSidebarItemsId.length + 1)) {
                let nitroTabNumber = 0;
                for (var j = 0; j < sections[i].children.length; j++) {
                    for (var k = 0; k < nitroTabsDataSettingsSidebarItemsId.length; k++) {
                        if (sections[i].children[j].getAttribute('data-settings-sidebar-item') === nitroTabsDataSettingsSidebarItemsId[k]) {
                            nitroTabNumber++;
                            break;
                        }
                    }
                }
                if (nitroTabNumber === nitroTabsDataSettingsSidebarItemsId.length) {
                    sections[i].classList.add(hiddenClassName);
                    break;
                }
            }
        }
    }
}

// #region In User

// Remove the nameplate of all users
async function removeNameplate() {
    if (!config.removeNameplate) return;
    const nameplateClassId = '_4bbc6dc06e75ad52-container';
    var nameplate = document.getElementsByClassName(nameplateClassId);
    if (nameplate) {
        for (var i = 0; i < nameplate.length; i++) {
            nameplate[i].classList.add(hiddenClassName);
        }
    }
}

// Remove avatar decoration of all users
function removeAvatarDecoration() {
    if (!config.removeAvatarDecoration) return;
    const decorationClassIds = [
        '_44b0c28be7879b7b-avatarDecoration', //Profile
        'c19a557985eb7793-avatarDecoration'  //In Chat
    ];
    for (var j = 0; j < decorationClassIds.length; j++) {
        var decoration = document.getElementsByClassName(decorationClassIds[j]);
        if (decoration) {
            for (var i = 0; i < decoration.length; i++) {
                decoration[i].classList.add(hiddenClassName);
            }
        }
    }
}

// Remove server tags of all users
async function removeServerTag() {
    if (!config.removeServerTag) return;
    const serverTagClassId = [
        '_5d473ecff348c314-clanTag',   // In member list
        '_972a0d22c8afa7f0-clanTag',   // In DM list
        'c19a557985eb7793-clanTagChiplet',  // In chat
        '_63ed30c16c7151f2-guildTag'  // In user profile pop-up, modal and side panel
    ];
    for (var i = 0; i < serverTagClassId.length; i++) {
        var serverTag = document.getElementsByClassName(serverTagClassId[i]);
        if (serverTag) {
            for (var j = 0; j < serverTag.length; j++) {
                serverTag[j].classList.add(hiddenClassName);
            }
        }
    }
}

// Remove the custom theme of all user (and also restore your current theme) (Modal, Pop-Up and Side Panel)
async function removeProfileTheme() {
    if (!config.removeProfileTheme) return;
    const userModalClassId = 'user-profile-modal-v2';   // Modal
    const userPopUpClassId = 'user-profile-popout';     // Pop-up
    const userSidePanelClassId = 'user-profile-sidebar';    // Side Panel
    var userModal = document.getElementsByClassName(userModalClassId);
    var userPopUp = document.getElementsByClassName(userPopUpClassId);
    var userSidePanel = document.getElementsByClassName(userSidePanelClassId);
    var userProfile = [...userModal, ...userPopUp, ...userSidePanel];
    if (userProfile) {
        if (userModal) {
            const backgroundClassId = '_9c3bea41fd465666-backgroundImage';  // Modal background
            var background = document.getElementsByClassName(backgroundClassId);
            if (background) {
                for (var i = 0; i < background.length; i++) {
                    background[i].classList.add(hiddenClassName);
                }
            }
        }
        const statusIndicatorClassId = '_44b0c28be7879b7b-svg';     // Status indicator background remove (used to have more contrast with custom theme)
        var statusIndicator = document.getElementsByClassName(statusIndicatorClassId);
        if (statusIndicator) {
            for (var i = 0; i < statusIndicator.length; i++) {
                if (statusIndicator[i].children) {
                    for (var j = 0; j < statusIndicator[i].children.length; j++) {
                        if (statusIndicator[i].children[j] && statusIndicator[i].children[j].tagName === 'circle') {
                            statusIndicator[i].children[j].classList.add(hiddenClassName);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < userProfile.length; i++) {
            userProfile[i].classList.remove('custom-theme-background');
            userProfile[i].classList.remove('custom-user-profile-theme');
            userProfile[i].style = "--profile-gradient-primary-color: var(--background-surface-high); --profile-gradient-secondary-color: var(--background-surface-high); --profile-gradient-overlay-color: rgba(0, 0, 0, 0); --profile-gradient-button-color: var(--background-mod-subtle); --profile-gradient-modal-background-color: var(--background-base-lower);";
            let profileTheme = 'null';
            for (const [themeName, classIds] of Object.entries(theme)) {
                let hasAllClasses = true;
                for (const classId of classIds) {
                    if (!userProfile[0].classList.contains(classId)) {
                        hasAllClasses = false;
                        break;
                    }
                }
                if (hasAllClasses) {
                    profileTheme = themeName;
                    break;
                }
            }
            if (currentTheme !== 'null' && profileTheme !== 'null' && currentTheme !== profileTheme) {      // Restore your theme
                for (var i = 0; i < userProfile.length; i++) {
                    for (const classId of theme[profileTheme]) {
                        userProfile[i].classList.remove(classId);
                    }
                    for (const classId of theme[currentTheme]) {
                        userProfile[i].classList.add(classId);
                    }
                }
            }
        }
    }
}

// Remove profile effect in pop-up, modal and side panel
async function removeProfileEffect() {
    if (!config.removeProfileEffect) return;
    const effectClassId = '_0137000bc80ab6ea-profileEffects';
    var effect = document.getElementsByClassName(effectClassId);
    if (effect) {
        for (var i = 0; i < effect.length; i++) {
            effect[i].classList.add(hiddenClassName);
        }
    }
}

// Remove the profile modal Shop button (in self profile only)
async function removeProfileSettingsShopBanner() {
    if (!config.removeProfileSettingsShopBanner) return;
    const bannerClassId = 'container__8279f';
    var banner = document.getElementsByClassName(bannerClassId)[0];
    if (banner) {
        banner.classList.add(hiddenClassName);
    }
}

// Remove all non-whitelisted nitro/quest badges in user profile pop-up, modal and side panel
async function removeNitroQuestBadges() {
    if (!config.removeNitroQuestBadges) return;
    const badgesClassId = '_8061a5f9dbf6d829-badge';
    //const devBadgeSrcId = '6bdc42827a38498929a4920da12695d9'; // Active Developer: Removed by Discord recently
    const assBadgeSrcId = '6de6d34650760ba5551a79732e98ed60'; // Originally known as
    const hypeSquadSrcId = [
        '011940fd013da3f7fb926e4a1cd2e618', // HypeSquad Brilliance
        '3aa41de486fa12454c3761e8e223442e', // HypeSquad Balance
        '8a88d63823d8a71cd5e390baa45efa02'  // HypeSquad Bravery
    ];
    const whiteBadgeSrcId = [];

    switch (config.removeNitroQuestBadges) {
        case true: // Remove all
            break;
        case 1: // Remove all except Originally known as
            whiteBadgeSrcId.push(assBadgeSrcId);
            break;
        case 2: // Remove all except HypeSquad
            whiteBadgeSrcId.push(...hypeSquadSrcId);
            break;
        case 3: // Remove all badges except HypeSquad and Originally known as
            whiteBadgeSrcId.push(assBadgeSrcId);
            whiteBadgeSrcId.push(...hypeSquadSrcId);
            break;
    }

    // Get all badges and verify if the badge contain on of white listed image id (and if not, add the hidden class)
    const badgeSrcId = whiteBadgeSrcId;
    var badges = document.getElementsByClassName(badgesClassId);
    if (badges) {
        for (var i = 0; i < badges.length; i++) {
            var badgeSrc = badges[i];
            if (badgeSrc) {
                let detected = false;
                for (var j = 0; j < badgeSrcId.length; j++) {
                    if (badgeSrc.src.includes(badgeSrcId[j])) {
                        detected = true;
                    }
                }
                if (detected === false) {
                    badgeContainer = badgeSrc.parentElement.parentElement;
                    if (badgeContainer) {
                        badgeContainer.classList.add(hiddenClassName);
                        separator = badgeContainer.nextElementSibling;
                        if (separator) {
                            separator.classList.add(hiddenClassName);
                        }
                    }
                }
            }
        }
    }
}

// Remove the user profile banner in pop-up, modal and side panel
async function removeProfileBanner() {
    if (!config.removeProfileBanner) return;
    const bannerClassId = '_68edb95846a37624-banner';
    var banner = document.getElementsByClassName(bannerClassId);
    if (banner) {
        for (var i = 0; i < banner.length; i++) {
            banner[i].classList.add(hiddenClassName);
        }
    }
}

// Remove display name style globally
async function removeDisplayNameStyle() {
    if (!config.removeDisplayNameStyle) return;
    const nameMemberListClassId = '_703b91fc872193e8-username';              // In membre list
    const nameMemberListClassIds = ['_703b91fc872193e8-name', '_703b91fc872193e8-username', '_41f68f5eee7f9abd-desaturateUserColors']   //Whitelist
    var nameMemberList = document.getElementsByClassName(nameMemberListClassId);
    if (nameMemberList) {
        for (var i = 0; i < nameMemberList.length; i++) {
            if (nameMemberList[i].classList.length > nameMemberListClassIds.length) {
                for (var j = 0; j < nameMemberList[i].classList.length; j++) {
                    if (!nameMemberListClassIds.includes(nameMemberList[i].classList[j])) {
                        nameMemberList[i].classList.remove(nameMemberList[i].classList[j])
                    }
                }
            }
        }
    }
    const nameChatClassId = 'c19a557985eb7793-username';                   // In chat
    const nameChatClassIds = ['c19a557985eb7793-username', 'c19a557985eb7793-usernameColorOnName', '_41f68f5eee7f9abd-desaturateUserColors', 'c19a557985eb7793-clickable']; // Whitelist
    var nameChat = document.getElementsByClassName(nameChatClassId);
    if (nameChat) {
        for (var i = 0; i < nameChat.length; i++) {
            if (nameChat[i].classList.length > nameChatClassIds.length) {
                for (var j = 0; j < nameChat[i].classList.length; j++) {
                    if (!nameChatClassIds.includes(nameChat[i].classList[j])) {
                        nameChat[i].classList.remove(nameChat[i].classList[j])
                    }
                }
            }
        }
    }
    const nameDMListClassId = '_972a0d22c8afa7f0-username';                // In DM list
    const nameDMListSubClassId = '_972a0d22c8afa7f0-withDisplayNameStyles'   //Need to be removed
    var nameDMList = document.getElementsByClassName(nameDMListClassId);
    if (nameDMList) {
        for (var i = 0; i < nameDMList.length; i++) {
            if (nameDMList[i].children[0]) {
                nameDMList[i].children[0].classList.remove(nameDMListSubClassId);
                nameDMList[i].children[0].innerHTML = nameDMList[i].children[0].innerText;
            }
        }
    }
    const namePopUpModalSidePanelClassId = '_63ed30c16c7151f2-usernameRow'      // In side panel, modal ans pop-up
    const namePopUpSidePanelSubClassId = '_63ed30c16c7151f2-clickableUsername'  // Only present for side panel and pop-up
    const namePopUpModalSidePanelSubClassId = '_63ed30c16c7151f2-nickname'      // Need to be added
    var namePopUpModalSidePanel = document.getElementsByClassName(namePopUpModalSidePanelClassId);
    if (namePopUpModalSidePanel) {
        for (var i = 0; i < namePopUpModalSidePanel.length; i++) {
            if (namePopUpModalSidePanel[i].children[0] && namePopUpModalSidePanel[i].children[0].className.includes(namePopUpSidePanelSubClassId)){     // Distinguish side panel/pop-up and modal
                var namePopUpSidePanelChild = namePopUpModalSidePanel[i].children[0];
                if (namePopUpSidePanelChild && namePopUpSidePanelChild.children[1]){
                    namePopUpSidePanelChild.children[1].classList.add(namePopUpModalSidePanelSubClassId);
                    namePopUpSidePanelChild.children[1].innerHTML = namePopUpSidePanelChild.children[1].innerText;
                }
            } else if (namePopUpModalSidePanel[i].children[0]) {
                namePopUpModalSidePanel[i].children[0].classList.add(namePopUpModalSidePanelSubClassId)
                namePopUpModalSidePanel[i].children[0].innerHTML = namePopUpModalSidePanel[i].children[0].innerText;
            }
        }
    }
}



// #region Deprecated functions

//Functions for small and big self profile nitro/shop buttons (Pop-out and Modal)
async function removeNitroBtnSelfProfileSmall() {
    const dataListItemId = '__get-premium';

    var btn = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (btn) {
        btn.classList.add(hiddenClassName);
        var separator = btn.previousElementSibling;
        if (separator) {
            separator.classList.add(hiddenClassName);
        }
    }
}
async function removeShopBtnSelfProfileSmall() {
    const dataListItemId = '__shop';

    var btn = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (btn) {
        btn.classList.add(hiddenClassName);
        var separator = btn.previousElementSibling;
        if (separator) {
            separator.classList.add(hiddenClassName);
        }
    }
}
async function removeNitroBtnSelfProfileBig() {
    const btnClassId = 'getPremiumButton_d6b606';

    var btn = document.getElementsByClassName(btnClassId)[0];
    if (btn) {
        btn.classList.add(hiddenClassName);
    }
}
async function removeShopBtnSelfProfileBig() {
    const btnClassId = 'textBanner_f9d37d';

    var btn = document.getElementsByClassName(btnClassId)[0];
    if (btn) {
        btn.classList.add(hiddenClassName);
    }
}

// Idk lol
async function removeBoostIconGuildMembers() {
    const iconClassId = 'premiumIcon_a31c43';

    var icon = document.getElementsByClassName(iconClassId);
    if (icon) {
        for (var i = 0; i < icon.length; i++) {
            icon[i].classList.add(hiddenClassName);
        }
    }
}

// Remove Nitro wheel in profile settings
async function removeNitroWheelProfileSettings() {
    const wheelClassId = ['nitroWheel_c5f0dc', 'nitroWheel__722a8'];
    for (var j = 0; j < wheelClassId.length; j++) {
        var wheel = document.getElementsByClassName(wheelClassId[j]);
        if (wheel) {
            for (var i = 0; i < wheel.length; i++) {
                wheel[i].classList.add(hiddenClassName);
            }
        }
    }
}

// Remove Nitro Pop-up
async function removeNitroPopup() {
    const popupClassId = 'popout_2907';

    var popup = document.getElementsByClassName(popupClassId)[0];
    if (popup) {
        popup.classList.add(hiddenClassName);
    }
}

// Remove Nitro banner on top
async function removeNitroTopBanner() {
    const bannerClassId = 'notice_be03aa';

    var banner = document.getElementsByClassName(bannerClassId)[0];
    if (banner) {
        banner.classList.add(hiddenClassName);
    }
}

async function removeFunctionsDeprecated() {
    removeNitroBtnSelfProfileSmall();
    removeShopBtnSelfProfileSmall();
    removeNitroBtnSelfProfileBig();
    removeShopBtnSelfProfileBig();
    removeBoostIconGuildMembers();
    removeNitroWheelProfileSettings();
    removeNitroPopup();
    removeNitroTopBanner();
}

// End of deprecated functions



async function removeFunction() {
    checkClientTheme();
    removeChatGifBtn();
    removeNitroBtnPrivateMessage();
    removeShopBtnPrivateMessage();
    removeGuildBoostTopBanner();
    removeBurstReactionPicker();
    removeQuestBtnPrivateMessage();
    removeNameplate();
    removeAvatarDecoration();
    removeServerTag();
    removeProfileTheme();
    removeProfileEffect();
    removeProfileSettingsShopBanner();
    removeActivityInMemberList();
    removeNitroTabsSettings();
    removeNitroQuestBadges();
    removeServerBoostChannel();
    removeProfileBanner();
    removeDisplayNameStyle();
}

// Function to load the saved config (or create-it if not exist)
async function getConfig() {
    try {
        Logger.info("Reading config...");
        let firstConfig = false;
        const newConfig = [];
        const configFilePath = path.join(Plugins.folder, "FkDiscord.config.json");
        if (!fs.existsSync(configFilePath)) {     // Doesn't exist: new install
            Logger.warn("Config not found.");
            firstConfig = true;
            fs.writeFileSync(configFilePath,
                JSON.stringify({
                    lastVersion: lastVersion,
                    showChangeLogAfterUpdate: true,
                    settings: { ...config }
                }, null, 4),
                "utf8"
            );
        } else {
            const configJson = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
            for (const [key, value] of Object.entries(config)) {
                if (key in configJson.settings) {
                    config[key] = configJson.settings[key];     // Load each settings
                } else {
                    newConfig.push(key);    // Add new unconfigured settings (likely after an update) to a list
                }
            }
            if (configJson.showChangeLogAfterUpdate) {
                showChangeLogAfterUpdate = configJson.showChangeLogAfterUpdate;
            }
            if (configJson.lastVersion) {
                lastVersion = configJson.lastVersion;   // The version that write the config file for the last time (used for the change log)
            }
        }
        Logger.info(`Reading config done. (New config: [${newConfig.join(",")}], ShowCLAfterU: ${showChangeLogAfterUpdate}, LastV: ${lastVersion})`);
        return { firstConfig, lastVersion, newConfig };
    } catch (e) {
        Logger.error(`Failed to read or parse config: ${e}`)
        return null;
    }
}

// Function to simply rest the plugin config by removing the config file
async function resetConfig() {
    try {
        Logger.info("Resetting config...");
        const configFilePath = path.join(Plugins.folder, "FkDiscord.config.json");
        if (!fs.existsSync(configFilePath)) {
            fs.rmSync(configFilePath);
        }
        Logger.info("Resetting config done.");
    } catch (e) {
        Logger.error(`Failed to reset config: ${e}`);
    }
}

// Function to overwrite the loaded config to the config file
async function setConfig() {
    try {
        Logger.info("Writing config...");
        const configFilePath = path.join(Plugins.folder, "FkDiscord.config.json");
        fs.writeFileSync(configFilePath,
            JSON.stringify({
                lastVersion: this.meta.version,
                showChangeLogAfterUpdate: true,
                settings: { ...config }
            }, null, 4),
            "utf8"
        );
        Logger.info("Writing config done.");
    } catch (e) {
        Logger.error(`Failed to write config: ${e}`)
    }
}

// Function based on the function used in BetterDiscord to parse and inject the "this.meta" used in plugins (but stripped down)
function parseMeta(fileContent) {
    const splitRegex = /[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/;
    const escapedAtRegex = /^\\@/;
    const block = fileContent.split("/**", 2)[1].split("*/", 1)[0];
    const out = {};
    let field = "";
    let accum = "";
    for (const line of block.split(splitRegex)) {
        if (line.length === 0) continue;
        if (line.charAt(0) === "@" && line.charAt(1) !== " ") {
            out[field] = accum;
            const l = line.indexOf(" ");
            field = line.substring(1, l);
            accum = line.substring(l + 1);
        }
        else {
            accum += " " + line.replace("\\n", "\n").replace(escapedAtRegex, "@");
        }
    }
    out[field] = accum.trim();
    delete out[""];
    out.format = "jsdoc";
    return out;
}

// Function to check update 
async function checkUpdate() {
    try {
        Logger.info("Checking update...");
        UI.showToast("Checking update for FkDiscord...", { type: "info", forceShow: true });
        const request = await fetch(this.meta.updateUrl);
        if (!request.ok) {
            throw new Error(request);
        }
        const content = await request.text();
        const updateMeta = parseMeta(content);                  // Split version strings x.y.z
        const updateVer = updateMeta.version.trim().split('.'); // Git
        const currentVer = this.meta.version.trim().split('.'); // This
        for (let i = 0; i < 3; i++) {       // Testing x, y and z
            if (updateVer[i] > currentVer[i]) {
                Logger.info(`Checking update done. Update available: ${updateMeta.version}`);   // This < Git
                UI.showToast("Update available for FkDiscord.", { type: "warning", forceShow: true });
                return { update: true, newVer: updateMeta.version }
            };
            if (updateVer[i] < currentVer[i]) {
                Logger.info("Checking update done. You have the update.");  // This > Git
                UI.showToast("No update for FkDiscord.", { type: "success", forceShow: true });
                return { update: false }
            };
        }
        Logger.info("Checking update done. No update.");    // This = Git
        UI.showToast("No update for FkDiscord.", { type: "success", forceShow: true });
        return { update: false };
    } catch (e) {
        Logger.error(`Failed to check update: ${e}`);
        UI.showToast("Failed to check update for FkDiscord.", { type: "error", forceShow: true });
        return null;
    }
}

// Function to apply the update
async function applyUpdate() {
    try {
        Logger.info("Applying update...");
        UI.showToast("Updating FkDiscord...", { type: "info", forceShow: true });
        const pluginFilePath = path.join(Plugins.folder, "FkDiscord.plugin.js");
        const request = await fetch(this.meta.updateUrl);
        if (!request.ok) {
            throw new Error(request);
        }
        const content = await request.text();
        fs.writeFileSync(pluginFilePath, content, "utf8");  // No reload after write, it's automatic
    } catch (e) {
        Logger.error(`Failed to apply update: ${e}`);
        UI.showToast("Failed to update FkDiscord.", { type: "error", forceShow: true });
        UI.showNotification({
            title: "FkDiscord error",
            content: "Failed to update.",
            type: "error",
            duration: 10000,
            actions: [
                {
                    label: "Retry to update",
                    onClick: async () => {
                        await applyUpdate();
                    }
                }
            ]
        });
    }

}

// Function to show the change log
async function showChangeLogModal(lastVersion) {
    try {
        Logger.info(`Showing change log... (current: ${this.meta.version}, last: ${lastVersion})`);
        const versions = Object.keys(changeLog);
        const currentIndex = versions.indexOf(this.meta.version);
        const lastIndex = versions.indexOf(lastVersion);
        if (lastIndex === -1) {
            throw new Error("Last version doesn't exist in change log");
        }
        if (currentIndex === -1) {
            throw new Error("Current version doesn't exist in change log");
        }
        const changeLogText = versions.slice(currentIndex, lastIndex).map(v => `${v} - ${changeLog[v]}`).join("\n\n");
        UI.showConfirmationModal("FkDiscord change log", changeLogText, {
            cancelText: null,
            onConfirm: async () => {
                await setConfig();
            }
        });
    } catch (e) {
        Logger.error(`Failed to show the change log: ${e}`);
    }
}

// Function to sync meta
function syncMeta(meta) {
    this.meta = { ...meta };
}

module.exports = class FkNitro {
    constructor(meta) {
        this.meta = meta;
        this.observer = null;
    }

    async start() {
        // Entry point
        Logger.info(`Starting FkDiscord ${this.meta.version}...`);
        // First sync meta
        syncMeta(this.meta);
        // Load config
        const getConfRet = await getConfig();
        if (!getConfRet) {
            UI.showToast("FkDiscord can't start !", { type: "error", forceShow: true });
            UI.showNotification({
                title: "FkDiscord error",
                content: "Failed to read or parse the config file.",
                type: "error",
                duration: 10000,
                actions: [
                    {
                        label: "Reset the config",
                        onClick: async () => {
                            UI.showConfirmationModal("FkDiscord reset", "Do you want to reset the plugin ? This will reset the configuration of the plugin.", {
                                onConfirm: async () => {
                                    UI.showToast("Resetting FkDiscord...", { type: "info", forceShow: true });
                                    await resetConfig();
                                    Plugins.reload("FkDiscord");
                                }
                            });
                        }
                    }
                ]
            });
            return; // Can't run without loading config
        }
        // Check for update
        const checkUpdateRet = await checkUpdate();
        if (!checkUpdateRet) {
            // Not critical if failed
            UI.showNotification({
                title: "FkDiscord warning",
                content: "Failed to check update.",
                type: "warning",
                duration: 10000
            });
        } else {
            if (checkUpdateRet.update && !getConfRet.firstConfig) {
                UI.showNotification({
                    title: "FkDiscord info",
                    content: `A new version is available.\n(${this.meta.version} -> ${checkUpdateRet.newVer})`,
                    type: "info",
                    duration: 10000,
                    actions: [
                        {
                            label: "Update now",
                            onClick: async () => {
                                await applyUpdate();
                            }
                        }
                    ]
                });
            }
        }

        // Check if it's first install
        if (getConfRet.firstConfig) {
            if (checkUpdateRet && checkUpdateRet.update) {
                // If is it and isn't up to date, auto update automaticaly
                Logger.info("This is a first install, and the plugin isn't up to date.");
                await resetConfig();
                await applyUpdate();
            } else {
                // Showing welcome msg
                Logger.info("This is a first install. Showing the welcome alert...");
                UI.alert("FkDiscord welcome", "Hi !\n\n\nIt looks like this is the first time this plugin has been installed.\n\nThis plugin lets you remove all the annoying garbage that Discord forces on you. (like Nitro, Quest, Shop and more...)\n\nFeel free to go to the plugin settings to configure it. (by default all it's removed)\n\n\nThanks for using FkDiscord <3")
            }
        }

        // Check if isn't new install and if it's been updated
        if (checkUpdateRet && !checkUpdateRet.update && !getConfRet.firstConfig && getConfRet.lastVersion != this.meta.version) {
            await showChangeLogModal(getConfRet.lastVersion);
        }

        // Injecting the css
        try {
            Logger.info("Injecting the css...")
            DOM.addStyle("FkDiscord.css", `.${hiddenClassName}{display: none;}`);
            Logger.info("Injection done.")
        } catch (e) {
            Logger.error(`Failed to inject the css: ${e}`);
            UI.showToast("FkDiscord can't start !", { type: "error", forceShow: true });
            UI.showNotification({
                title: "FkDiscord error",
                content: "Failed to inject the css.",
                type: "error",
                duration: 10000,
                actions: [
                    {
                        label: "Restart the plugin",
                        onClick: async () => {
                            Plugins.reload("FkDiscord");
                        }
                    }
                ]
            });
            return; // Can't start without css
        }

        // Connect observer
        Logger.info("Connecting observer...");
        try {
            const targetNode = document.getElementById('app-mount');    // App-Mount is the base element of discord
            if (!targetNode) throw new Error("App-Mount not found");
            const config = { childList: true, subtree: true };
            this.observer = new MutationObserver(() => {
                Logger.info("Change observed, running remove function...")
                removeFunction();
            });
            this.observer.observe(targetNode, config);
        } catch (e) {
            Logger.error(`Failed to connect observer: ${e}`);
            UI.showToast("FkDiscord can't start !", { type: "error", forceShow: true });
            UI.showNotification({
                title: "FkDiscord error",
                content: "Failed to connect observer.",
                type: "error",
                duration: 10000,
                actions: [
                    {
                        label: "Restart the plugin",
                        onClick: async () => {
                            Plugins.reload("FkDiscord");
                        }
                    }
                ]
            });
            return; // Can't start without observer
        }

        Logger.info("Started successfully ! Re-enjoy the Discord xp and fk Discord !");
        UI.showToast("FkDiscord started successfully.", { type: "success", forceShow: true });
        UI.showNotification({
            title: "FkDiscord status",
            content: "FkDiscord started successfully.\n\nYou can now re-enjoy the Discord UI/UX !",
            type: "success"
        });
    }

    async getSettingsPanel() {
        Logger.info("Opening settings...");
        const panel = UI.buildSettingsPanel({   // Building settings
            settings: settingsPanel,
            onChange: async (category, id, value) => {
                config[id] = value;
                await setConfig();
            }
        });
        // Adding event when closed to reload the plugin
        const Original = panel.type;
        panel.type = (props) => {
            React.useEffect(() => {
                return () => {
                    Logger.info("Settings closed. Restarting...");
                    Plugins.reload("FkDiscord");
                };
            }, []);

            return React.createElement(Original, props);
        };
        return panel;
    }

    stop() {
        Logger.info("Stopping FkDiscord...");
        // Disconnect observer
        Logger.info("Disconnecting observer...");
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        // Removing all hiddenClass from elements
        Logger.info("Removing class for all elements...");
        var elements = document.getElementsByClassName(hiddenClassName);
        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove(hiddenClassName);
            }
        }
        // Removing the css
        Logger.info("Removing the injection...");
        DOM.removeStyle("FkDiscord.css");
        // Exit point
    }
};