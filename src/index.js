import { make } from "@groupher/editor-utils";
/**
 * Build styles
 */
import css from "./index.css";
import tippy, { hideAll } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import Icons from "./iconIndex";

const peopleImgSrc =
  "https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

/**
 * People Block for the Editor.js.
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 */

/**
 * @typedef {Object} DelimiterData
 * @description Tool's input and output data format
 */
export default class People {
  /**
   * Allow Tool to have no content
   * @return {boolean}
   */
  static get contentless() {
    return true;
  }

  /**
   * Allow to press Enter inside the plugin
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: `<svg width="19" t="1595923402082" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15249"><path d="M384 469.333333a170.666667 170.666667 0 1 0-170.666667-170.666666 170.666667 170.666667 0 0 0 170.666667 170.666666zM725.333333 554.666667a128 128 0 1 0-128-128 128 128 0 0 0 128 128zM896 853.333333a42.666667 42.666667 0 0 0 42.666667-42.666666 213.333333 213.333333 0 0 0-343.893334-168.533334A298.666667 298.666667 0 0 0 85.333333 853.333333a42.666667 42.666667 0 0 0 42.666667 42.666667h512a42.666667 42.666667 0 0 0 42.666667-42.666667" p-id="15250"></path></svg>`,
      title: "人物/团队",
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: DelimiterData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.CSS = {
      block: this.api.styles.block,
      wrapper: "cdx-people",
      galleryWrapper: "cdx-people-gallery-wrapper",
      galleryAvatar: "cdx-people-gallery-avatar",
      galleryBox: "cdx-people-gallery-box",
      galleryBoxTitle: "cdx-people-gallery-box-title",
      galleryBoxBio: "cdx-people-gallery-box-bio",
      galleryBoxDesc: "cdx-people-gallery-box-desc",
    };

    this.data = {
      title: data.title || "",
      content: data.content || "",
    };

    this.TitleInput = null;
    this.CollapseContent = null;

    this.element = null;
    this.data = data;
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    const Wrapper = make("DIV", [this.CSS.block, this.CSS.wrapper], {});
    const GalleryWrapper = make("DIV", [this.CSS.galleryWrapper]);

    const avatarEl = this.buildGalleryAvatar();
    const galleryCardEl = this.buildGalleryCard();

    GalleryWrapper.appendChild(avatarEl);
    GalleryWrapper.appendChild(galleryCardEl);

    Wrapper.appendChild(GalleryWrapper);

    return Wrapper;
  }
  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  buildGalleryAvatar() {
    const avatarEl = make("img", this.CSS.galleryAvatar, {
      src: peopleImgSrc,
    });

    return avatarEl;
  }

  /**
   * create a gallery card
   * @return {HTMLElement}
   * @private
   */
  buildGalleryCard() {
    const boxEl = make("DIV", this.CSS.galleryBox);

    const titleEl = make("DIV", this.CSS.galleryBoxTitle, {
      innerHTML: "我是山三",
      contentEditable: true,
    });

    const bioEl = make("DIV", this.CSS.galleryBoxBio, {
      innerHTML: "UI/UX designer",
      contentEditable: true,
    });
    const descEl = make("DIV", this.CSS.galleryBoxDesc, {
      innerHTML:
        "特别是太空军事化竞赛中争取一个有利位置是至关重要的，但由于资金不足，这些饼有多少可以最终拿出成果，以当下的投入和进度而言，难言乐观",
      contentEditable: true,
    });

    boxEl.appendChild(titleEl);
    boxEl.appendChild(bioEl);
    boxEl.appendChild(descEl);

    return boxEl;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    this.element = this.drawView();
    return this.element;
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return {};
  }
}
