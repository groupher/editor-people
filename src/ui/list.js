import { make, clazz, replaceEl } from "@groupher/editor-utils";

import css from "../styles/list.css";

const peopleImgSrc =
  "https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

const peopleImgSrc2 =
  "https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1484399172022-72a90b12e3c1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

export default class ListUI {
  constructor({ api, config }) {
    this.api = api;
    this.config = config;

    this.data = {
      type: "gallery", // or list
      items: [
        {
          id: 1,
          active: true,
          avatar: peopleImgSrc,
          title: "mydearxym",
          bio: "life is great",
          desc:
            "特别是太空军事化竞赛中争取一个有利位置是至关重要的，但由于资金不足，这些饼有多少可以最终拿出成果，以当下的投入和进度而言，难言乐观",
        },
        {
          id: 2,
          avatar: peopleImgSrc2,
          title: "simon2",
          bio: "life is fucked",
          desc: "这个是比较短的介绍",
        },
      ],
    };

    this.PreviewerEl = null;
    this.AvatarEl = null;
    this.BoxEl = null;
  }

  /**
   * CSS classes
   * @constructor
   */
  get CSS() {
    return {
      listWrapper: "cdx-people-list-wrapper",
      listCard: "cdx-people-list-card",
      listAvatar: "cdx-people-list-avatar",
      listBox: "cdx-people-list-box",
      listBoxTitle: "cdx-people-list-box-title",
      listBoxBio: "cdx-people-list-box-bio",
      listBoxDesc: "cdx-people-list-box-desc",
    };
  }

  /**
   * drawGalleryCard
   * @return {HTMLElement}
   * @private
   */
  drawList() {
    const Wrapper = make("DIV", [this.CSS.listWrapper]);
    const CardEl = this._drawCard();
    const CardEl2 = this._drawCard();
    const CardEl3 = this._drawCard();
    const CardEl4 = this._drawCard();
    // const CardEl = make("DIV", this.CSS.galleryCard);

    // this.AvatarEl = this._drawAvatar(activePeople);
    // this.BoxEl = this._drawBox(activePeople);

    // CardEl.appendChild(this.AvatarEl);
    // CardEl.appendChild(this.BoxEl);
    Wrapper.appendChild(CardEl);
    Wrapper.appendChild(CardEl2);
    Wrapper.appendChild(CardEl3);
    Wrapper.appendChild(CardEl4);

    return Wrapper;
  }

  _drawCard() {
    const Wrapper = make("DIV", [this.CSS.listCard]);
    const people = this.data.items[0];
    const AvatarEl = this._drawAvatar(people);
    const BoxEl = this._drawBox(people);

    Wrapper.appendChild(AvatarEl);
    Wrapper.appendChild(BoxEl);

    return Wrapper;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  _drawAvatar(people) {
    const AvatarEl = make("img", this.CSS.listAvatar, {
      src: people.avatar,
    });

    return AvatarEl;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  _drawBox(people) {
    const Wrapper = make("DIV", this.CSS.listBox);
    const TitleEl = make("INPUT", this.CSS.listBoxTitle, {
      value: people.title,
      contentEditable: true,
      placeholder: "姓名或昵称",
    });

    const BioEl = make("INPUT", this.CSS.listBoxBio, {
      value: people.bio,
      contentEditable: true,
      placeholder: "简短描述",
    });

    Wrapper.appendChild(TitleEl);
    Wrapper.appendChild(BioEl);

    return Wrapper;
  }
}
