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
            helper.createModal(component, pup);
        }
    },

    loadMoreRows: function (component) {
        // console.log('load more');
    },

    handleSelect: function (component, event, helper) {
        let id = event.getParam('id');

        switch (id) {
        case 'datalist':
            helper.addList(component);
            break;
        default:
            break;
        }
    },

    setBreedName: function (component, event) {
        const val = event.target.value;

        component.set('v.breedName', val);
        event.target.blur();
    }
});
