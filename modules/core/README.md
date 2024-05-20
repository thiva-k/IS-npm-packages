# WSO2 Identity Server - Core module for Identity apps.

Commonly used configs, schemas, utilities and low level services for WSO2 Identity Server frontend apps.

## Install
Add following dependency in your package.json file.
`"@thiva/core": "<VERSION>"`

## Sub modules

The following sub modules are available for use and can be imported in to the projects.

1. api - Contains common API requests (`wso2is/core/api`)
2. configs - Common configs such as endpoints etc. (`wso2is/core/configs`)
3. constants - Common constants (`wso2is/core/constants`)
4. exceptions - Common exceptions (`wso2is/core/exceptions`)
5. helpers - Helper functions such as history, parsers etc. (`wso2is/core/helpers`)
6. hooks - Contains reusable react hooks. (`wso2is/core/hooks`)
7. models - Commonly used models and schemas. (`wso2is/core/models`)
8. store - Common redux actions, types and reducers (`wso2is/core/store`)
9. utils - Common utils (`wso2is/core/utils`)
9. workers - Contains used web workers (`wso2is/core/workers`)

## Notes

1. If TSLint starts detecting submodule imports such as `wso2is/core/utils` as an error, you can edit `no-submodule-imports` rule in the TSLint configuration to whitelist them.

```json
{
    "rules": {
        "no-submodule-imports": [
            true,
            "@thiva/core/api",
            "@thiva/core/configs",
            "@thiva/core/constants",
            "@thiva/core/exceptions",
            "@thiva/core/helpers",
            "@thiva/core/hooks",
            "@thiva/core/models",
            "@thiva/core/store",
            "@thiva/core/utils",
            "@thiva/core/workers"
        ]
    }
}
``` 

2. Oftentimes, sub modules are not properly resolved. Specially type detection and intelligence will not work as expected unless the submodule paths are explicitly declared in the Typescript config file.  

Please declare the following paths inside the `tsconfig.json` of your application.

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@thiva/core/api": [ "node_modules/@thiva/core/dist/types/api" ],
            "@thiva/core/configs": [ "node_modules/@thiva/core/dist/types/configs" ],
            "@thiva/core/constants": [ "node_modules/@thiva/core/dist/types/constants" ],
            "@thiva/core/exceptions": [ "node_modules/@thiva/core/dist/types/exceptions" ],
            "@thiva/core/helpers": [ "node_modules/@thiva/core/dist/types/helpers" ],
            "@thiva/core/hooks": [ "node_modules/@thiva/core/dist/types/hooks" ],
            "@thiva/core/models": [ "node_modules/@thiva/core/dist/types/models" ],
            "@thiva/core/store": [ "node_modules/@thiva/core/dist/types/store" ],
            "@thiva/core/utils": [ "node_modules/@thiva/core/dist/types/utils" ],
            "@thiva/core/workers": [ "node_modules/@thiva/core/dist/types/workers" ]
        }
    }
}
```


## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.

