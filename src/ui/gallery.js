import { make, clazz, replaceEl, cutFrom } from "@groupher/editor-utils";

import css from "../styles/gallery.css";

import { SOCIAL_LIST, MODE } from "../constant";

export default class GalleryUI {
  constructor({ api, config, data }) {
    this.api = api;
    this.config = config;

    this._data = data;

    this.PreviewerEl = null;
    this.AvatarEl = null;
    this.IntroEl = null;
  }

  /**
   * CSS classes
   * @constructor
   */
  get CSS() {
    return {
      galleryWrapper: "cdx-people-gallery-wrapper",
      galleryCard: "cdx-people-gallery-card",
      galleryPreviewerWrapper: "cdx-people-gallery-previewer-wrapper",
      galleryPreviewerItem: "cdx-people-gallery-previewer-item",
      galleryPreviewerItemActive: "cdx-people-gallery-previewer-item-active",
      galleryPreviewerAvatar: "cdx-people-gallery-previewer-avatar",
      galleryAvatar: "cdx-people-gallery-avatar",
      galleryIntro: "cdx-people-gallery-intro",
      galleryIntroTitle: "cdx-people-gallery-intro-title",
      galleryIntroBio: "cdx-people-gallery-intro-bio",
      galleryIntroDesc: "cdx-people-gallery-intro-desc",
    };
  }

  /**
   * drawGalleryCard
   * @return {HTMLElement}
   * @private
   */
  drawCard() {
    let activePeople;
    const isMoreThanOneUser = this._data.items.length > 1;

    if (isMoreThanOneUser) {
      activePeople = this._data.items.filter((item) => item.active)[0];
    } else {
      activePeople = this._data.items[0];
    }

    const Wrapper = make("DIV", [this.CSS.galleryWrapper]);
    const CardEl = make("DIV", this.CSS.galleryCard);

    const PreviewerEl = this._drawPreviewer();

    this.AvatarEl = this._drawAvatar(activePeople);
    this.IntroEl = this._drawIntro(activePeople);

    CardEl.appendChild(this.AvatarEl);
    CardEl.appendChild(this.IntroEl);

    if (isMoreThanOneUser) {
      Wrapper.appendChild(PreviewerEl);
    }

    Wrapper.appendChild(CardEl);

    return Wrapper;
  }

  /**
   * create drawGalleryPreviewer
   * @return {HTMLElement}
   * @private
   */
  _drawPreviewer() {
    const isMoreThanOneUser = this._data.items.length > 1;

    if (!isMoreThanOneUser) {
      this.PreviewerEl = null;
      return this.PreviewerEl;
    }

    this.PreviewerEl = make("DIV", this.CSS.galleryPreviewerWrapper);

    this._data.items.map((people) => {
      const PeopleEl = this._drawPreviewAvatar(people);
      PeopleEl.addEventListener("click", () => {
        this._selectPeople(people);
      });

      this.PreviewerEl.appendChild(PeopleEl);
    });

    return this.PreviewerEl;
  }

  /*
   * select people as current active one
   */
  _selectPeople({ id }) {
    for (let index = 0; index < this._data.items.length; index++) {
      const people = this._data.items[index];
      if (people.id === id) {
        people.active = true;
      } else {
        people.active = false;
      }
    }

    const activePreviewerItemEl = this.PreviewerEl.querySelector(
      '[data-previewer-active="true"]'
    );
    const newActivePreviewerItemEl = this.PreviewerEl.querySelector(
      `[data-previewer-id="${id}"]`
    );

    clazz.remove(activePreviewerItemEl, this.CSS.galleryPreviewerItemActive);
    activePreviewerItemEl.setAttribute("data-previewer-active", false);

    clazz.add(newActivePreviewerItemEl, this.CSS.galleryPreviewerItemActive);
    newActivePreviewerItemEl.setAttribute("data-previewer-active", true);

    const activePeople = this._data.items.filter((item) => item.active)[0];

    this.AvatarEl.firstElementChild.src = activePeople.avatar;

    const TheNewIntroEl = this._drawIntro(activePeople);
    replaceEl(this.IntroEl, TheNewIntroEl, this.api);
    this.IntroEl = TheNewIntroEl;
  }

  /**
   * draw preview avatar
   * @return {HTMLElement}
   * @private
   */
  _drawPreviewAvatar(people) {
    const wrapperCSS = people.active
      ? [this.CSS.galleryPreviewerItem, this.CSS.galleryPreviewerItemActive]
      : this.CSS.galleryPreviewerItem;

    const Wrapper = make("div", wrapperCSS, {
      "data-previewer-active": !!people.active,
      "data-previewer-id": people.id,
    });

    const AvatarEl = make("img", this.CSS.galleryPreviewerAvatar, {
      src: people.avatar,
      loading: "eager",
      "data-skip-plus-button": true,
    });

    Wrapper.appendChild(AvatarEl);

    return Wrapper;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  _drawAvatar(people) {
    const WrapperEl = make("div", this.CSS.galleryAvatar);

    const AvatarEl = make("img", "", {
      src: people.avatar,
    });

    WrapperEl.appendChild(AvatarEl);

    return WrapperEl;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  _drawIntro(people) {
    const Wrapper = make("DIV", this.CSS.galleryIntro);
    const TitleEl = make("INPUT", this.CSS.galleryIntroTitle, {
      value: people.title,
      contentEditable: true,
      placeholder: "姓名或昵称",
    });

    const BioEl = make("INPUT", this.CSS.galleryIntroBio, {
      value: people.bio,
      contentEditable: true,
      placeholder: "简短描述",
      "data-skip-plus-button": true,
    });
    const DescEl = make("DIV", this.CSS.galleryIntroDesc, {
      innerHTML: cutFrom(people.desc, 70),
      // "特别是太空军事化竞赛中争取一个有利位置是至关重要的，但由于资金不足，这些饼有多少可以最终拿出成果，以当下的投入和进度而言，难言乐观",
      contentEditable: true,
      placeholder: "详细介绍",
    });

    const SocialListEl = this._drawSocialList();

    Wrapper.appendChild(TitleEl);
    Wrapper.appendChild(BioEl);
    Wrapper.appendChild(DescEl);
    Wrapper.appendChild(SocialListEl);

    return Wrapper;
  }

  /**
   * draw user's social list
   *
   * @returns
   * @memberof GalleryUI
   */
  _drawSocialList() {
    const Wrapper = make("DIV", "cdx-people-gallery-social-wrapper");

    for (let i = 0; i < SOCIAL_LIST.length; i++) {
      const social = SOCIAL_LIST[i];
      const SocialEl = make("a", "cdx-people-gallery-social-icon", {
        innerHTML: social.icon,
      });

      this.api.tooltip.onHover(SocialEl, social.title, { delay: 200 });

      Wrapper.appendChild(SocialEl);
    }

    return Wrapper;
  }

  get data() {
    const _tmp = {
      mode: MODE.GALLERY,
      items: [
        {
          id: 2,
          avatar:
            "https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1484399172022-72a90b12e3c1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          title: "simon2",
          bio: "life is fucked",
          desc: "这个是比较短的介绍",
        },
      ],
    };
    // const data = this.exportData();
    // this.setData(data);
    // return data;
    return {};
  }
}
