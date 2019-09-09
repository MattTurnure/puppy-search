({
    init: function (component, event, helper) {
        const utils = component.find('utils');
        const action = component.get('c.getBreeds');

        utils.callAction(action)
            .then($A.getCallback(response => {
                let breeds = JSON.parse(response);

                component.set('v.breeds', Object.keys(breeds.message));
            }))
            .catch($A.getCallback(err => {
                utils.showToast(
                    'System Error', err, 'error', 'sticky'
                );
            }));
    },

    getPups: function (component, event, helper) {
        event.preventDefault();

        // start spinner
        component.set('v.loaded', false);

        helper.renderPups(component);
    },

    handleSelectedRows: function (component, event, helper) {
        let selectedRows = event.getParam('selectedRows');

        console.log(selectedRows);
    },

    handleRowAction: function (component, event, helper) {
        const action = event.getParam('action');
        const utils = component.find('utils');
        const serverMethod = component.get('c.getImagesByBreed');
        let pup = event.getParam('row');

        component.set('v.breedName', pup.breed);

        const params = {
            breedName: component.get('v.breedName')
        };

        if (action.name === 'view_pup') {
            utils.callAction(serverMethod, params)
                .then($A.getCallback(response => {
                    let res = JSON.parse(response);

                    if (res.status === 'success') {
                        let images = res.message;

                        // pup.imgPath = helper.getRandomPuppyImage(images);

                        helper.createModal(component, pup);
                    } else {
                        utils.showToast(
                            'There was a problem', res.message, 'error', 'sticky'
                        );
                    }
                }))
                .catch($A.getCallback(err => {
                    utils.showToast(
                        'System Error', err, 'error', 'sticky'
                    );
                }));
        }
    },

    loadMoreRows: function (component) {
        // console.log('load more');
    },

    // lightning kicks out the 'list' HTML5 attribute, so add it back when
    // DOM is ready
    onRender: function (component) {
        const input = component.find('breedselect').getElement();

        input.setAttribute('list', 'breeds');
    },

    setBreedName: function (component, event) {
        const val = event.target.value;

        component.set('v.breedName', val);

        event.target.blur();
    },

    getPuppyImage: function (component, event, helper) {
        event.preventDefault();

        const utils = component.find('utils');
        const action = component.get('c.getImagesByBreed');
        const params = {
            breedName: component.get('v.breedName')
        };

        utils.callAction(action, params)
            .then($A.getCallback(response => {
                let res = JSON.parse(response);

                if (res.status === 'success') {
                    let images = res.message;

                    console.log(helper.getRandomPuppyImage(images));
                } else {
                    utils.showToast(
                        'There was a problem', res.message, 'error', 'sticky'
                    );
                }
            }))
            .catch($A.getCallback(err => {
                utils.showToast(
                    'System Error', err, 'error', 'sticky'
                );
            }));
    }
});
