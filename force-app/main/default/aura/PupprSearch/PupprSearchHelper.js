({
    getRandomPuppyImage: function (images) {
        const index = this.getRandomInt(images.length);

        return images[index];
    },

    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    renderPups: function (component) {
        const utils = component.find('utils');
        const action = component.get('c.getDogs');

        utils.callAction(action)
            .then($A.getCallback(response => {
                let dogs = JSON.parse(response);
                let cols = [{
                    label: 'Name',
                    fieldName: 'name',
                    type: 'text'
                }, {
                    label: 'Breed',
                    fieldName: 'breed',
                    type: 'text'
                }, {
                    label: 'Age',
                    fieldName: 'age',
                    type: 'text'
                }, {
                    label: 'Sex',
                    fieldName: 'sex',
                    type: 'text'
                }, {
                    label: 'Shelter',
                    fieldName: 'shelter',
                    type: 'text'
                }, {
                    label: 'View',
                    type: 'button',
                    initialWidth: 135,
                    typeAttributes: {
                        label: 'View Pup',
                        name: 'view_pup',
                        title: 'Click to View Pup'
                    }
                }];

                component.set('v.puppyColumns', cols);
                component.set('v.puppyData', dogs);

                // stop spinner
                component.set('v.loaded', true);
            }))
            .catch($A.getCallback(err => {
                utils.showToast(
                    'System Error', err, 'error', 'sticky'
                );
            }));
    },

    createModal: function (component, pup) {
        $A.createComponent(
            'c:PupModal', {
                'aura:id': 'pup-modal',
                'pup': pup
            },
            function (modal, status, errorMessage){
                //Add the new button to the body array
                if (status === 'SUCCESS') {
                    let body = component.get('v.body');

                    body.push(modal);
                    component.set('v.body', body);
                } else if (status === 'INCOMPLETE') {
                    console.log('No response from server or client is offline.');
                    // Show offline error
                } else if (status === 'ERROR') {
                    console.log('Error: ' + errorMessage);
                    // Show error message
                }
            }
        );
    }
});
