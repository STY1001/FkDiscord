/**
 * @name FkDiscord
 * @version 1.0.0
 * @description Remove all annoying garbage from Discord (like Nitro (and his features), Shop, Boost, Quests, Tags and more...)
 * @author STY1001
 * @source https://github.com/STY1001/FkDiscord
 */

function removeChatGifBtn() {
    const btnClassId = 'container_fdeb78';

    var btn = document.getElementsByClassName(btnClassId)[0];
    if (btn) {
        btn.style = "display: none;";
    }
}

function removeNitroPopup() {
    const popupClassId = 'popout_2907';

    var popup = document.getElementsByClassName(popupClassId)[0];
    if (popup) {
        popup.style = "display: none;";
    }
}

function removeNitroBtnSelfProfileSmall() {
    const dataListItemId = '__get-premium';

    var btn = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (btn) {
        btn.style = "display: none;";
        var separator = btn.previousElementSibling;
        if (separator) {
            separator.style = "display: none;";
        }
    }
}

function removeShopBtnSelfProfileSmall() {
    const dataListItemId = '__shop';

    var btn = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (btn) {
        btn.style = "display: none;";
        var separator = btn.previousElementSibling;
        if (separator) {
            separator.style = "display: none;";
        }
    }
}

function removeNitroBtnSelfProfileBig() {
    const btnClassId = 'getPremiumButton_d6b606';

    var btn = document.getElementsByClassName(btnClassId)[0];
    if (btn) {
        btn.style = "display: none;";
    }
}

function removeShopBtnSelfProfileBig() {
    const btnClassId = 'textBanner_f9d37d';

    var btn = document.getElementsByClassName(btnClassId)[0];
    if (btn) {
        btn.style = "display: none;";
    }
}

function removeNitroBtnPrivateMessage() {
    const dataListItemId = '__nitro';

    var item = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (item) {
        item.style = "display: none;";
    }
}

function removeQuestBtnPrivateMessage() {
    const dataListItemId = '__quests';

    var item = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (item) {
        item.style = "display: none;";
    }
}

function removeShopBtnPrivateMessage() {
    const dataListItemId = '__shop';

    var item = document.querySelector(`[data-list-item-id$="${dataListItemId}"]`);
    if (item) {
        item.style = "display: none;";
    }
}

function removeGuildBoostTopBanner() {
    const bannerClassId = 'container_c75f85';

    var banner = document.getElementsByClassName(bannerClassId)[0];
    if (banner) {
        banner.style = "display: none;";
    }
}

function removeBurstReactionPicker() {
    const divClassId = 'burstToggle_c6ee36';

    var div = document.getElementsByClassName(divClassId)[0];
    if (div) {
        div.style = "display: none;";
    }
}

function removeBoostIconGuildMembers() {
    const iconClassId = 'premiumIcon_a31c43';

    var icon = document.getElementsByClassName(iconClassId);
    if (icon) {
        for (var i = 0; i < icon.length; i++) {
            icon[i].style = "display: none;";
        }
    }
}

function removeNitroTopBanner() {
    const bannerClassId = 'notice_be03aa';

    var banner = document.getElementsByClassName(bannerClassId)[0];
    if (banner) {
        banner.style = "display: none;";
    }
}

function removeNameplate() {
    const nameplateClassId = 'container__4bbc6';
    var nameplate = document.getElementsByClassName(nameplateClassId);
    if (nameplate) {
        for (var i = 0; i < nameplate.length; i++) {
            nameplate[i].style = "display: none;";
        }
    }
}

function removeAvatarDecoration() {
    const decorationClassId1 = 'avatarDecoration__44b0c';
    const decorationClassId2 = 'avatarDecoration_c19a55';
    var decoration = document.getElementsByClassName(decorationClassId1);
    if (decoration) {
        for (var i = 0; i < decoration.length; i++) {
            decoration[i].style = "display: none;";
        }
    }
    decoration = document.getElementsByClassName(decorationClassId2);
    if (decoration) {
        for (var i = 0; i < decoration.length; i++) {
            decoration[i].style = "display: none;";
        }
    }
}

function removeClanTag() {
    const clanTagClassId = ['clanTag__5d473', 'clanTag__972a0', 'clanTagChiplet_c19a55'];
    var clanTag = document.getElementsByClassName(clanTagClassId[0]);
    if (clanTag) {
        for (var i = 0; i < clanTag.length; i++) {
            clanTag[i].style = "display: none;";
        }
    }
    clanTag = document.getElementsByClassName(clanTagClassId[1]);
    if (clanTag) {
        for (var i = 0; i < clanTag.length; i++) {
            clanTag[i].style = "display: none;";
        }
    }
    clanTag = document.getElementsByClassName(clanTagClassId[2]);
    if (clanTag) {
        for (var i = 0; i < clanTag.length; i++) {
            clanTag[i].style = "display: none;";
        }
    }
}

function removeGuildTag() {
    const guildTagClassId = 'guildTag__63ed3';
    var guildTag = document.getElementsByClassName(guildTagClassId);
    if (guildTag) {
        for (var i = 0; i < guildTag.length; i++) {
            guildTag[i].style = "display: none;";
        }
    }
}

function removeProfilePopupTheme() {
    const userPopUpClassId = 'user-profile-popout';
    var userPopUp = document.getElementsByClassName(userPopUpClassId);
    if (userPopUp) {
        for (var i = 0; i < userPopUp.length; i++) {
            userPopUp[i].classList.remove('custom-theme-background');
            userPopUp[i].classList.remove('custom-user-profile-theme');
            userPopUp[i].style = "--profile-gradient-primary-color: var(--background-surface-high); --profile-gradient-secondary-color: var(--background-surface-high); --profile-gradient-overlay-color: rgba(0, 0, 0, 0); --profile-gradient-button-color: var(--background-mod-subtle); --profile-gradient-modal-background-color: var(--background-base-lower);";
        }
    }
}

function removeProfileGlobalTheme() {
    const backgroundClassId = 'backgroundImage__9c3be';
    const userPopUpClassId = 'user-profile-modal-v2';
    var background = document.getElementsByClassName(backgroundClassId);
    if (background) {
        for (var i = 0; i < background.length; i++) {
            background[i].style = "display: none;";
        }
    }
    var userPopUp = document.getElementsByClassName(userPopUpClassId);
    if (userPopUp) {
        for (var i = 0; i < userPopUp.length; i++) {
            userPopUp[i].classList.remove('custom-theme-background');
            userPopUp[i].classList.remove('custom-user-profile-theme');

            let themeMode = 'null';
            let themeColor = 'null';
            const themeStore = localStorage.getItem('ThemeStore');
            if (themeStore && themeStore !== 'null') {
                const themeData = JSON.parse(themeStore);
                themeMode = themeData._state.theme;
                if (themeMode) {
                    switch (themeMode) {
                        case 'dark':
                            themeColor = 'dark';
                            break;
                        case 'light':
                            themeColor = 'light';
                            break;
                        case 'darker':
                            themeColor = 'darker';
                            break;
                        case 'midnight':
                            themeColor = 'midnight';
                            break;
                    }
                }
            }

            if (themeColor && themeColor !== 'null') {
                userPopUp[i].classList.remove('image-light');
                userPopUp[i].classList.remove('image-dark');
                userPopUp[i].classList.remove('theme-dark');
                userPopUp[i].classList.remove('theme-light');
                userPopUp[i].classList.remove('theme-dark');
                userPopUp[i].classList.remove('theme-light');
                userPopUp[i].classList.remove('theme-darker');
                userPopUp[i].classList.remove('theme-midnight');
                userPopUp[i].classList.add('theme-' + themeColor);
                if (themeColor === 'darker' || themeColor === 'midnight') {
                    userPopUp[i].classList.add('theme-dark');
                }
                if (themeColor === 'light') {
                    userPopUp[i].classList.add('image-light');
                }
                if (themeColor === 'dark' || themeColor === 'darker' || themeColor === 'midnight') {
                    userPopUp[i].classList.add('image-dark');
                }
            }

            userPopUp[i].style = "--profile-gradient-primary-color: var(--background-surface-high); --profile-gradient-secondary-color: var(--background-surface-high); --profile-gradient-overlay-color: rgba(0, 0, 0, 0); --profile-gradient-button-color: var(--background-mod-subtle); --profile-gradient-modal-background-color: var(--background-base-lower);";
        }
    }
}

function removeProfileEffect() {
    const effectClassId = 'profileEffects__01370';
    var effect = document.getElementsByClassName(effectClassId);
    if (effect) {
        for (var i = 0; i < effect.length; i++) {
            effect[i].style = "display: none;";
        }
    }
}

function removeProfileSettingsShopBanner() {
    const bannerClassId = 'container__8279f';
    var banner = document.getElementsByClassName(bannerClassId)[0];
    if (banner) {
        banner.style = "display: none;";
    }
}

function removeActivityInMemberList() {
    const activityHeaderClassId = 'headerContainer__095fe';
    var activityHeader = document.getElementsByClassName(activityHeaderClassId)[0];
    if (activityHeader) {
        activityHeader.parentElement.style = "display: none;";
    }
    const activityClassId = 'container__0f2e8';
    var activity = document.getElementsByClassName(activityClassId);
    if (activity) {
        for (var i = 0; i < activity.length; i++) {
            activity[i].parentElement.parentElement.style = "display: none;";
        }
    }
}

function removeNitroTabsSettings() {
    const nitroFirstTabClassId = 'premiumTab__581ea';
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
            allNitroTabsClassId[i].style = "display: none;";
        }
    }    
}

function removeNitroWheel(){
    const wheelClassId = ['nitroWheel_c5f0dc', 'nitroWheel__722a8'];
    for (var j = 0; j < wheelClassId.length; j++) {
        var wheel = document.getElementsByClassName(wheelClassId[j]);
        if (wheel) {
            for (var i = 0; i < wheel.length; i++) {
                wheel[i].style = "display: none;";
            }
        }
    }
}

function removeSideProfileTheme() {
    const sideProfileClassId = 'user-profile-sidebar';
    var sideProfile = document.getElementsByClassName(sideProfileClassId);
    if (sideProfile) {
        for (var i = 0; i < sideProfile.length; i++) {
            sideProfile[i].classList.remove('custom-theme-background');
            sideProfile[i].classList.remove('custom-user-profile-theme');
            sideProfile[i].style = "--profile-gradient-primary-color: var(--background-surface-high); --profile-gradient-secondary-color: var(--background-surface-high); --profile-gradient-overlay-color: rgba(0, 0, 0, 0); --profile-gradient-button-color: var(--background-mod-subtle); --profile-gradient-modal-background-color: var(--background-base-lower);";
        }
    }
}

function removeFunction() {
    removeChatGifBtn();
    removeNitroPopup();
    removeNitroBtnSelfProfileSmall();
    removeShopBtnSelfProfileSmall();
    removeNitroBtnSelfProfileBig();
    removeShopBtnSelfProfileBig();
    removeNitroBtnPrivateMessage();
    removeShopBtnPrivateMessage();
    removeGuildBoostTopBanner();
    removeBurstReactionPicker();
    removeBoostIconGuildMembers();
    removeNitroTopBanner();
    removeQuestBtnPrivateMessage();
    removeNameplate();
    removeAvatarDecoration();
    removeClanTag();
    removeGuildTag();
    removeProfilePopupTheme();
    removeProfileGlobalTheme();
    removeProfileEffect();
    removeProfileSettingsShopBanner();
    removeActivityInMemberList();
    removeNitroTabsSettings();
    removeNitroWheel();
    removeSideProfileTheme();
}

const delaysec = 10;


module.exports = class FkNitro {
    start() {
        BdApi.showToast(`Starting FkNitro in ${delaysec} sec...`, { type: 'info' });
        setTimeout(() => {
            BdApi.showToast('FkNitro started', { type: 'info' });
            removeFunction();
            this.observeChanges();
        }, delaysec * 1000);
        for (let i = 0; i < delaysec; i++) {
            setTimeout(() => {
                BdApi.showToast((delaysec - i), { type: 'info' });
            }, i * 1000);
        }
    }

    observeChanges() {
        const targetNode = document.getElementById('app-mount');
        const config = { childList: true, subtree: true };
        const observer = new MutationObserver(() => {
            removeFunction();
        });
        observer.observe(targetNode, config);
    }

    observer(o) {
        if (("emoji-picker-grid").includes(o.target.id)) {

        }
    }

    stop() {
        BdApi.showToast('FkNitro stopped', { type: 'info' });
    }
};


