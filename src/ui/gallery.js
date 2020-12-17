import { make } from "@groupher/editor-utils";

import css from "../styles/gallery.css";

const peopleImgSrc =
  "https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

export default class Ui {
  constructor({ api, config }) {
    this.api = api;
    this.config = config;
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

    const PreviewerEl = this.drawPreviewer();
    const AvatarEl = this.drawAvatar();
    const BoxEl = this.drawBox();

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
  drawPreviewer() {
    const Wrapper = make("img", this.CSS.galleryPreviewerWrapper);

    return Wrapper;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  drawAvatar() {
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
  drawBox() {
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
      innerHTML:
        "特别是太空军事化竞赛中争取一个有利位置是至关重要的，但由于资金不足，这些饼有多少可以最终拿出成果，以当下的投入和进度而言，难言乐观",
      contentEditable: true,
    });

    BoxEl.appendChild(TitleEl);
    BoxEl.appendChild(BioEl);
    BoxEl.appendChild(DescEl);

    return BoxEl;
  }
}
