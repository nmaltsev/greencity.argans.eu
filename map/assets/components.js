function emptyNode(node){
    if (!node) return;
    var 	i = node.childNodes.length;

    while (i-- > 0){
        node.removeChild(node.childNodes[i]);
    }
    return node;
}

function forEachElement(node, cb) {
	let $next = node.firstElementChild;
	if (!$next) return;
	let $current;
	do {
		$current = $next;
		$next = $next.nextElementSibling;
		cb($current);
	} while($next);
}
/**
 * 
 * TODO fix MouseOut
 * 
 <data-dropdown value="en">
    <div data-option="en">En</div>
    <div data-option="fr">FR</div>
</data-dropdown>
*/

customElements.define('data-dropdown', class extends HTMLElement {
    // #root = null;
    // #$selected = null;
    #$menu = null;
    #$label = null;
    #$root = null;
    #selectedValue = null;
    #availableOptions = null;
    #isOpened = false;
    
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') {
            console.log('[ATTR VALUE] %s -> %s', oldValue, newValue);
            this.#selectedValue = newValue;
            this.#render(newValue);
        }
    }

    connectedCallback() {
        const $root = this.attachShadow({mode: 'open'});
		$root.innerHTML = this.constructor.template;

		this.#$menu = this.shadowRoot.getElementById('menu');
		this.#$label = this.shadowRoot.getElementById('label');
		this.#$root = this.shadowRoot.getElementById('root');

        this.shadowRoot.addEventListener('slotchange', (e) => {
			const slot = e.target;
           
            if (!!slot.name) return;

			const elements = slot.assignedElements();

			// console.log('SLOT %s %s', slot.name, this.#selectedValue);
			// console.dir(elements);

            this.#availableOptions = elements;
            this.#render();
		});

        this.#$label.onclick = (e) => {
            e.stopPropagation();
            this.#toggle();
        }

        // this.#$root.onmouseout = (e) => {
        //     const 	$target = e.toElement || e.relatedTarget;

        //     if(!(
        //         $target === this.#$root || this.#$root.contains($target)
        //     )){
        //         this.#toggle();
        //     }
        // }

        this.#$root.onmouseout = (e) => {
            const 	$target = e.toElement || e.relatedTarget;

            console.log('MouseOut');
            console.dir([$target, $target === this.#$root, this.#$root.contains($target)]);

            if(!(
                $target === this.#$root || this.#$root.contains($target)
            )){
                // this.#toggle();
                this.#$menu.style.display = '';
                this.#isOpened = false;
            }
        }

        this.#$menu.onclick = (e) =>{
            console.log('MENU click');
            const $selectedItem = e.target.closest('[data-option]');
            this.setAttribute('value', $selectedItem.dataset.option);

            this.#toggle();
        }
    }

    #setSelectedItem($selectedItem) {
        const $selectedItemCopy = $selectedItem.cloneNode(true);

        if (this.#$label.firstChild) {
            this.#$label.firstChild.remove();
        }
        this.#$label.appendChild($selectedItemCopy);
    }

    #toggle() {
        console.log('TOGGLE %s', this.#isOpened);
        if (!this.#isOpened) {
            this.#$menu.style.display = 'block';
        } else {
            this.#$menu.style.display = '';
        }
        this.#isOpened = !this.#isOpened;
    }

    
    disconnectedCallback()  {
        // TODO
    }

 
	#render() {
        // this.#selectedValue this.#availableOptions

        // console.log('RENDER');
        // console.dir([this.#selectedValue, this.#availableOptions]);

        if (Array.isArray(this.#availableOptions)  && this.#availableOptions.length > 0){
            if (!this.#selectedValue) {
                this.#selectedValue = this.#availableOptions[0].dataset.option;
                this.#setSelectedItem(this.#availableOptions[0]);
                return;
            } else {
                const $selectedItem = this.#availableOptions.find($element => $element.dataset.option == this.#selectedValue)

                if (!$selectedItem) {
                    return;
                }
                this.#setSelectedItem($selectedItem);
                return;
            }
        } 
    }

    static template = `\
<style>
:host {
    display: inline-block;
    vertical-align: baseline;
    width: auto;
    height: 100%;
    min-width: 100px;
    cursor: pointer;
}
.sc_ctx{
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
	background: #fff;
	border: 1px solid #e2e2e2;
	color: #333;
	font-size: 13px;
	line-height: 18px;
	white-space: nowrap;
	text-align: left;
}
.sc_ctx-item{
	padding: 4px 8px;
}
.sc_ctx-item:hover{
	background-color: #0491d3;
	color: #fff;
}
.sc_ctx-item:active{
	background-color: #0aaaf4;
}
#root {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
}
#root::after {
    content: "";
    display: block;
    flex: 0 0 auto;
    width: 10px;
    height: 100%;
    background: blue;
}
#menu {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
}
#label {
    flex: 1 1 auto;
}
</style>
<div id="root">
    <div id="label"></div>
    <slot id="menu"></slot>
</div>\
`
});

