import {langCheck} from "../../../../mobile/utils/utils";

export default function () {
    return {
        "items": [
            {
                "visible": true,
                "label": langCheck("0000PUB-000295"),
                "code": "country",
                "isMultiSelectedEnabled": false,
                "refcode": "uapbd/refer/pubinfo/CountryDefaultGridRef/index",
                "itemtype": "refer",
                "fieldValued": "refpk"
            },
            {
                "visible": true,
                "label": langCheck("0000PUB-000296"),
                "code": "province",
                "isMultiSelectedEnabled": false,
                "refcode": "uapbd/refer/pubinfo/RegionDefaultTreeRef/index",
                "itemtype": "refer",
                "fieldValued": "refpk"
            },
            {
                "visible": true,
                "label": langCheck("0000PUB-000297"),
                "code": "city",
                "isMultiSelectedEnabled": false,
                "refcode": "uapbd/refer/pubinfo/RegionDefaultTreeRef/index",
                "itemtype": "refer",
                "fieldValued": "refpk"
            },
            {
                "visible": true,
                "label": langCheck("0000PUB-000298"),
                "code": "vsection",
                "isMultiSelectedEnabled": false,
                "refcode": "uapbd/refer/pubinfo/RegionDefaultTreeRef/index",
                "itemtype": "refer",
                "fieldValued": "refpk"
            },
            {
                "visible": true,
                "maxlength": "128",
                "label": langCheck("0000PUB-000299"),
                "code": "detailinfo",
                "itemtype": "input"
            },
            {
                "visible": true,
                "maxlength": "128",
                "label": langCheck("0000PUB-000300"),
                "code": "postcode",
                "itemtype": "input"
            },
            {
                "visible": true,
                "label": langCheck("0000PUB-000301"),
                "code": "addressFullName",
                "itemtype": "textarea",
                "disabled": true
            }
        ],
        "moduletype": "form",
    }
}