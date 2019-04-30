
import {Model} from "./model.js";
import {View} from "./view.js";
import {ViewTable} from "./view-table.js";
import {Controller} from "./controller.js";


window.addEventListener('load', () => {
   const model = new Model([
                                    {
                                        id: 1,
                                       notes: 'read book',
                                       type: 'active',
                                       state: false,
                                    },
                                    {
                                        id: 2,
                                       notes: 'learn js',
                                       type: 'archival',
                                       state: false,
                                    }
                                 ]);


   const view = new View(model, {
      list: document.querySelector('.container'),            // innerHTML
      addButton: document.getElementById('plusBtn'),
      delButton: document.getElementById('minusBtn'),
      changeButton: document.getElementById('changeBtn'),
   });

    const viewT = new ViewTable(model, {
        list: document.querySelector('.containerTable'),            // innerHTML
        addButton: document.getElementById('plusButton'),
        delButton: document.getElementById('minusButton'),
        changeButton: document.getElementById('changeButton'),
    });

   const controller = new Controller(model, view);
   const controllerT = new Controller(model, viewT);
});
