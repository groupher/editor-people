import { make } from "@groupher/editor-utils";

import css from "../styles/gallery.css";

const peopleImgSrc =
  "https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

const peopleImgSrc2 =
  "https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1484399172022-72a90b12e3c1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

export default class Ui {
  constructor({ api, config }) {
    this.api = api;
    this.config = config;

    this.data = {
      type: "gallery", // or list
      items: [
        {
          active: true,
          avatar: peopleImgSrc,
          title: "mydearxym",
          bio: "life is great",
          desc:
            "特别是太空军事化竞赛中争取一个有利位置是至关重要的，但由于资金不足，这些饼有多少可以最终拿出成果，以当下的投入和进度而言，难言乐观",
        },
        {
          avatar: peopleImgSrc2,
          title: "simon2",
          bio: "life is fucked",
          desc:
            "特别是太空军事化竞赛中争取一个有利位置是至关重要的，但由于资金不足，这些饼有多少可以最终拿出成果，以当下的投入和进度而言，难言乐观",
        },
      ],
    };
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
      galleryPreviewerTitle: "cdx-people-gallery-previewer-title",
      galleryAvatar: "cdx-people-gallery-avatar",
      galleryBox: "cdx-people-gallery-box",
      galleryBoxTitle: "cdx-people-gallery-box-title",
      galleryBoxBio: "cdx-people-gallery-box-bio",
      galleryBoxDesc: "cdx-people-gallery-box-desc",
    };
  }

  /**
   * drawGalleryCard
   * @return {HTMLElement}
   * @private
   */
  drawCard() {
    const Wrapper = make("DIV", [this.CSS.galleryWrapper]);
    const CardEl = make("DIV", this.CSS.galleryCard);

    const PreviewerEl = this._drawPreviewer();
    const AvatarEl = this._drawAvatar();
    const BoxEl = this._drawBox();

    CardEl.appendChild(AvatarEl);
    CardEl.appendChild(BoxEl);

    Wrapper.appendChild(PreviewerEl);
    Wrapper.appendChild(CardEl);

    return Wrapper;
  }

  /**
   * create drawGalleryPreviewer
   * @return {HTMLElement}
   * @private
   */
  _drawPreviewer() {
    const Wrapper = make("DIV", this.CSS.galleryPreviewerWrapper);

    this.data.items.map((people) => {
      const AvatarEl = this._drawPreviewAvatar(people);
      Wrapper.appendChild(AvatarEl);
    });

    return Wrapper;
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

    const Wrapper = make("div", wrapperCSS);

    const AvatarEl = make("img", this.CSS.galleryPreviewerAvatar, {
      src: people.avatar,
    });

    const TitleEl = make("div", this.CSS.galleryPreviewerTitle, {
      innerHTML: people.title,
    });

    Wrapper.appendChild(AvatarEl);
    Wrapper.appendChild(TitleEl);

    return Wrapper;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  _drawAvatar() {
    const AvatarEl = make("img", this.CSS.galleryAvatar, {
      src: peopleImgSrc,
    });

    return AvatarEl;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  _drawBox() {
    const BoxEl = make("DIV", this.CSS.galleryBox);
    const TitleEl = make("INPUT", this.CSS.galleryBoxTitle, {
      contentEditable: true,
      placeholder: "姓名或昵称",
    });

    const BioEl = make("INPUT", this.CSS.galleryBoxBio, {
      value: "",
      contentEditable: true,
      placeholder: "简短描述",
    });
    const DescEl = make("DIV", this.CSS.galleryBoxDesc, {
      innerHTML: "",
      // "特别是太空军事化竞赛中争取一个有利位置是至关重要的，但由于资金不足，这些饼有多少可以最终拿出成果，以当下的投入和进度而言，难言乐观",
      contentEditable: true,
      placeholder: "详细介绍",
    });

    BoxEl.appendChild(TitleEl);
    BoxEl.appendChild(BioEl);
    BoxEl.appendChild(DescEl);

    return BoxEl;
  }
}
