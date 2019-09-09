({
    /**
     * Instantiate an Apex controller method. This will return a promise.
     *
     * @param  {Component} component
     * @param  {Event} event
     * @return {Promise} the response from the server
     */
    callAction: function (component, event) {
        const args = event.getParam('arguments');
        const action = args[0];
        const params = args[1];

        return new Promise((resolve, reject) => {
            if (typeof params !== 'undefined') {
                action.setParams(params);
            }

            action.setCallback(this, response => {
                if (component.isValid() && response.getState().toLowerCase() === 'success') {
                    resolve(response.getReturnValue());
                } else {
                    reject(response.getError()[0].message);
                }
            });

            $A.enqueueAction(action);
        });
    },

    /**
     * Toast messages for Lightning Experience
     *
     * @param  {String} title title of toast
     * @param  {String} message message of toast
     * @param  {String} type possible values are 'success', 'warning', 'error', 'info'
     * @param  {String} mode possible values: 'dismissible', 'sticky', 'pester'
     * @return {void}
     */
    showToast: function (component, event) {
        const toastEvent = $A.get('e.force:showToast');
        const args = event.getParam('arguments');
        const title = typeof args[0] === 'undefined' ? '' : args[0];
        const message = typeof args[1] === 'undefined' ? '' : args[1];
        const type = typeof args[2] === 'undefined' ? '' : args[2];
        const mode = typeof args[3] === 'undefined' ? '' : args[3];

        if (toastEvent) {
            toastEvent.setParams({
                title: title,
                message: message,
                type: type,
                mode: mode
            });
            toastEvent.fire();
        } else {
            let msg = title !== '' ? `${title}: ${message}` : message;

            console.info(msg);
        }
    },

    /**
     * Format the number based on the locale of the user.
     *
     * @param  {Decimal} amount The number to be formatted
     * @param  {Integer} decimalPlaces Number of decimal places to show
     * @return {String} formatted string (i.e., 1,000.00 for US or 1.000,00 for Germany)
     */
    formatNumber: function (amount, decimalPlaces) {
        const language = $A.get('$Locale.language');
        const userLocaleCountry = $A.get('$Locale.userLocaleCountry');
        const langLocale = `${language}-${userLocaleCountry}`;

        // Check support for toLocaleString options
        const supportsToLocaleStringOptions = () => {
            return !!(typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function');
        };

        if (amount == null) {
            return amount;
        }

        if (supportsToLocaleStringOptions() === true) {
            return amount.toLocaleString(langLocale, {
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces
            });
        }

        return amount;
    },

    /**
     * Proxy objects are unreadable in the console. During development, this method will allow
     * one to view Proxy object content in the browser dev console.
     *
     * @param  {String} title Title of log
     * @param  {Object} proxyObj Proxy object to be logged
     * @param  {Array} colorConfig Optional to customize color of log (i.e., ['black','orange'])
     */
    logProxy: function (component, event) {
        const args = event.getParam('arguments');
        let theme = { bg: '#222', color: '#fff' };

        if (typeof args[2] !== 'undefined') {
            theme = {
                bg: Array.isArray(args[2]) ? args[2][0] : '#222',
                color: Array.isArray(args[2]) ? args[2][1] : '#fff'
            };
        }

        console.info(
            `%c${args[0]}`,
            `background-color: ${theme.bg}; color: ${theme.color}; padding: 0.5rem;`,
            JSON.parse(JSON.stringify(args[1]))
        );
    }
});
