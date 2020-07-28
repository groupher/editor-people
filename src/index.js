import { make } from '@groupher/editor-utils'
/**
 * Build styles
 */
import css from "./index.css";
import tippy, { hideAll } from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import Icons from './iconIndex'


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
      title: "人物/团队"
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
      wrapper: "cdx-column",
      innerWrapper: "cdx-column-inner-wrapper",
      column: "cdx-column-part",
      columnHead: "cdx-column-head",
      columnSpot: "cdx-column-spot",
      columnTitle: "cdx-column-title",
      columnBody: "cdx-column-body",
      // dots
      selector: "cdx-color-selector",
      selectDot: "cdx-color-selector-dot",
      activeDot: "cdx-color-selector-dot--active",
    };

    this.data = {
      title: data.title || "",
      content: data.content || ""
    };

    this.TitleInput = null;
    this.CollapseContent = null;

    this.element = this.drawView();
    this.data = data;
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    const Wrapper = make("DIV", [this.CSS.block, this.CSS.wrapper], {});
    const InnerWrapper = make("DIV", [this.CSS.innerWrapper]);

    this.ColumnLeft = this.drawColumn('left')
    this.ColumnRight = this.drawColumn('right')

    InnerWrapper.appendChild(this.ColumnLeft);
    InnerWrapper.appendChild(this.ColumnRight);

    Wrapper.appendChild(InnerWrapper);

    return Wrapper;
  }

  reDrawView() {
    this.element = this.drawView()
  }

  /**
   * Create left or right column
   * @return {HTMLElement}
   * @private
   */
  drawColumn(part) {
    const Wrapper = make("DIV", [this.CSS.column]);
    const Head = make("DIV", [this.CSS.columnHead]);

    const ActiveIcon = Icons[0]
    const Spot = make("DIV", [this.CSS.columnSpot], {
      innerHTML: ActiveIcon.icon
    });
    const Title = make("DIV", [this.CSS.columnTitle], {
      contentEditable: true,
      placeholder: "输入标题 ..."
    });

    const Body = make("DIV", [this.CSS.columnBody], {
      placeholder: "输入内容 ...",
      contentEditable: true
    });

    Head.appendChild(Spot);
    Head.appendChild(Title);

    Wrapper.appendChild(Head);
    Wrapper.appendChild(Body);

    this.api.listeners.on(Spot, 'click', () => {
      tippy(Spot, this.drawSpotSelector(part, ActiveIcon))
    }, false);

    return Wrapper;
  }

  /**
   * spot icon selector panel
   * @param {string} part - 'left' or 'right'
   * @param {object} activeIcon - current used icon in column
   * @param {string} activeIcon.name - icon name
   * @param {string} activeIcon.icon - icon svg content
   * @return {HTMLElement}
   * @private
   */
  drawSpotSelector(part, activeIcon) {
    const Wrapper = make('div', [this.CSS.selector])

    Icons.forEach(iconItem => {
      const Dot = make('div', [this.CSS.selectDot], {
        innerHTML: iconItem.icon
      })

      Wrapper.appendChild(Dot)

      if (activeIcon.name === iconItem.name) {
        Dot.classList.add(this.CSS.activeDot)
      }

      this.api.listeners.on(Dot, 'click', () => {
        Wrapper.childNodes.forEach(item => {
          item.classList.remove(this.CSS.activeDot)
        })

        const Column = part === 'left' ? this.ColumnLeft : this.ColumnRight

        // console.log("ColumnLeft: ", this.ColumnRight)
        const ColumnIcon = Column.getElementsByClassName(this.CSS.columnSpot)
        ColumnIcon[0].innerHTML = Dot.innerHTML

        Dot.classList.add(this.CSS.activeDot)
      }, false);
    })

    return {
      content: Wrapper,
      theme: 'light',
      // delay: 200,
      trigger: "click",
      placement: 'bottom',
      // allowing you to hover over and click inside them.
      interactive: true,
    }
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
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
