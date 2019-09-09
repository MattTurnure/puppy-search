module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "$A": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": ["error", {
            "allow": ["info", "warn", "error"]
        }],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": "*",
                "next": "return"
            }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "key-spacing": ["error", {
            "afterColon": true
        }],
        "keyword-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "space-before-blocks": ["error", "always"],
        "space-infix-ops": "error"
    }
};
