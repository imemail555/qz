import React from 'react'
import qz from 'qz-tray'
import { RSAKey, stob64, hextorstr } from 'jsrsasign'
import { setTimeout } from 'timers';

let config;
class QZ extends React.Component {

    componentWillMount() {

        this.connectQz();
    }
    connectQz() {

        qz.api.setPromiseType(function promise(resolver) { return new Promise(resolver); })
        qz.api.setSha256Type(function (data) {
            return data;
        });

        // qz.security.setCertificatePromise(function (resolve, reject) {
        //     alert('phew');
        //     resolve("-----BEGIN CERTIFICATE-----\n" +
        //             `MIIEHzCCAwegAwIBAgIUG9OD9lTgq3UnE/JpuIyWWCVFAvUwDQYJKoZIhvcNAQEL
        //             BQAwgZ0xCzAJBgNVBAYTAlBLMRAwDgYDVQQIDAdmZWRlcmFsMRIwEAYDVQQHDAlJ
        //             c2xhbWFiYWQxEDAOBgNVBAoMB2Zpa2lmb28xGTAXBgNVBAsMEHBhbmVsIGRlcGFy
        //             dG1lbnQxFDASBgNVBAMMC1VtYWlyIEphbWFsMSUwIwYJKoZIhvcNAQkBFhZtLmFs
        //             aTE5ODcxQG91dGxvb2suY29tMCAXDTE4MTAwNTA1MzYyMVoYDzIwNTAwMzMwMDUz
        //             NjIxWjCBnTELMAkGA1UEBhMCUEsxEDAOBgNVBAgMB2ZlZGVyYWwxEjAQBgNVBAcM
        //             CUlzbGFtYWJhZDEQMA4GA1UECgwHZmlraWZvbzEZMBcGA1UECwwQcGFuZWwgZGVw
        //             YXJ0bWVudDEUMBIGA1UEAwwLVW1haXIgSmFtYWwxJTAjBgkqhkiG9w0BCQEWFm0u
        //             YWxpMTk4NzFAb3V0bG9vay5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK
        //             AoIBAQDcv+LFQSKPW4KjpjUXbX4BeN0eanQiFvs0B1E/xHK1MMhtd6FFNeWOJmbH
        //             ubBFHyFbK5GsjGOvx0whgQ34qBfHmRTxh7WjCHeiygpxSSnRATAJ3/CW+vkkl1xJ
        //             vXZggwpWMVe8xjbFTMB5a+OXnj/sLgEg+seWaH/RxaKORQjM2E2jqNKrePmu4E9M
        //             ZhZIHOniVPCUtQ5ztI+NigqhLU3suH29SEqdNlZNnxTt5k3l8INfQGl1NQZ0DFYd
        //             IIKG+GozIdEQcSqIjWTef/PSM6ptCAPPKYAZn70ijAQnsM6tEDk/EyuL5teAXn9h
        //             aU0tiCpHawSGHbDqlN3JDpchlb2LAgMBAAGjUzBRMB0GA1UdDgQWBBRMHwCIprFm
        //             xYwgpCWBZz5Qm6PI0TAfBgNVHSMEGDAWgBRMHwCIprFmxYwgpCWBZz5Qm6PI0TAP
        //             BgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQCF44EA4VNDzaPo7iCD
        //             lnGK3u5wu/YFHvw35+qwtMTT3ZAY+7aW2ccYfAhwfzw9iOUIrrrhOxDDlPuxGKNW
        //             V/WpT2BHeiw71JcueLUw8q4a8sfPCOjOawV4LHDHGBqVLi3JwiKLhm9iec4JCS9+
        //             ZnFQzl4rFWd7Nf3yGsU5ImFhl1VrJ0Eic5sgkr7TkOuj+2e746wezZzBCvpVi3cN
        //             DltiPl2uXXWWwkaIcUGhE6tP7raKQFEMu8lRnWqqt6CXLuJRt+KI3C7awkz1rB4S
        //             jJ5INCIdqlYC/0RmJbzRzY8DIm2neXYQaoLgIEKoX7sAxt/2xRvmq4aqi8ypmt1k
        //             1QtR\n` +
        //             "-----END CERTIFICATE-----");
        // });
        // var privateKey =  "-----BEGIN PRIVATE KEY-----\n" +
        // `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDcv+LFQSKPW4Kj
        // pjUXbX4BeN0eanQiFvs0B1E/xHK1MMhtd6FFNeWOJmbHubBFHyFbK5GsjGOvx0wh
        // gQ34qBfHmRTxh7WjCHeiygpxSSnRATAJ3/CW+vkkl1xJvXZggwpWMVe8xjbFTMB5
        // a+OXnj/sLgEg+seWaH/RxaKORQjM2E2jqNKrePmu4E9MZhZIHOniVPCUtQ5ztI+N
        // igqhLU3suH29SEqdNlZNnxTt5k3l8INfQGl1NQZ0DFYdIIKG+GozIdEQcSqIjWTe
        // f/PSM6ptCAPPKYAZn70ijAQnsM6tEDk/EyuL5teAXn9haU0tiCpHawSGHbDqlN3J
        // Dpchlb2LAgMBAAECggEBAK1q/V6THfBbJpUjdF/0P2Iurh8/5/4D6dJk0Tp0PN0E
        // 9t+wdHwnrC/xERtkUArtOsohvy47l/C2c6N6fBxVCWFfbGmWgGYUt8+mQ2/d10D/
        // WtrXF220ulc5pWG0urN1HoC6AMAnQ03aTvbUgBZTVspXFcHv4S3S6F9GkL6Nky1A
        // Zjd0LthMA0fNlZSw5w23BtcyyCunubIlUF/rs4+Wm+PfKxo7CbNwagwEtjj3xnIU
        // PGamAOvpXHl+UC6lQoZ4tcw04zdLktx2GOmUZQzDJcmH5GsYYGZ/7S1rvBlAhqEJ
        // fekGZzh0N5iuv2DVeTtqjVDgJoJ1xH3IXCWidm8yXgECgYEA+icO2WgIna+6oLS5
        // 0G053JBYrM43doO9Y+qn9hRotyAYD9nOSEb97o+NrMT2AJgknfXAeMC4nwnUPbTe
        // JYzvPu8lILKZG52uj8o9tks+U3kg28qLqK4YfVLtdxQDrfOmNjIVZxzoXzA7ZdDv
        // hASefTCZALSDYa8/VPnwwcN6yIsCgYEA4ejgcywk77IIOVvRliFN9tHC097+pfwc
        // 401/fyKX1K/7GD5KVv5BIRatDJ791uxvXSLhfo+R7V64HUZ+th8wFgYz2tB7XlH/
        // IXSiv/7CsFjEojzelWh5Q4N/nZ1oEBgSVItmrBHlIr/z9kILBaI9EDSNcxx4Orz0
        // Dq8SZZOafwECgYEA5fngifk96pJzNmnQZpD0YBWIoJ4ZmWh2RpSmA/MxbiIgXPo1
        // zncN3zO04UBWladKCrqzT5CGaxgjOvO8Q7N1BFvhu1TWs+/cWy9oWt6EF0PF9Ksa
        // iGI9+4Gw9Qe+dj8I8MxMpvaJn3F9OhbDDJEekCOMlnxeSQFPbTU3pTus9w8CgYAb
        // bZ/au/BcHdx7wlcnCDIkFoG2Iav/USXcvysMr5GJpDgzUFTMTSBxOQSXtLITJy+6
        // OiLwr9PC4y4td8KosA6xjd074vYnlIMKd9POxcqziIOPQx6vOzkF5nBXHaZl1dZb
        // 53T2zVFpr66aJpiZ/YG2dvr5j+pVD13+bmkoZgxrAQKBgEwCzzStMvUMA1PEo6wX
        // M7iInOD1qstgq4bdd/LIdkrUW6FnblordE1nbQBMY4W/9PScmuFJs/b/K0MZanP5
        // BfBMvgH+n9hnEkmVaswfYiZl+s2krrQCW9i2y2vCNu0zh9pJmxcznwEd7tEa1+5k
        // WR2uiA7eeWcVlRqlcATFUFMM\n`
        // +
        // "-----END PRIVATE KEY-----";

        // qz.security.setSignaturePromise(function (toSign) {
        //     alert('phew 2')
        //     return function (resolve, reject) {
        //         try {
        //             var pk = new RSAKey();
        //             pk.readPrivateKeyFromPEMString(strip(privateKey));
        //             var hex = pk.signString(toSign, 'sha1');
        //             resolve(stob64(hextorstr(hex)));
        //         } catch (err) {
        //             console.error(err);
        //             reject(err);
        //         }
        //     };
        // });

        // function strip(key) {
        //     if (key.indexOf('-----') !== -1) {
        //         alert(key.split('-----')[2].replace(/\r?\n|\r/g, ''))
        //         return key.split('-----')[2].replace(/\r?\n|\r/g, '');
        //     }
        // }

        let printer = "RONGTA 58mm Series Printer";


        setTimeout(() => {
            alert('runinng qz connect')
            //connect qz
            qz.websocket.connect().then(() => {
                console.log('qz connected');

                //config printer
                var top = .25, right = 0.25, bottom = 0.25, left = 15;
                config = qz.configs.create(printer, {
                    colorType: 'grayscale',
                    interpolation: "nearest-neighbor",
                    margins: { top: 0.25, right: 0.25, bottom: 0.25, left: 0.15 }
                });



                this.setState({ qzConnected: true });
            });





        }, 1000)
    }

    print = () => {
        // const {
        //     orderNumber,
        //     specialInstructions,
        //     name,
        //     phoneNo,
        //     fullAddress, house, street,
        //     createdAt,
        //     orderType,
        //     status,
        //     cookingTime,
        //     paymentMethod,
        //     subTotal,
        //     gst,
        //     deliveryCharges,
        //     discount, additionalServices,
        //     orders
        // } = deconstructOrderDetails(this.props.orderDetails);
        // const RestaurantName = fetchRestaurantName(orders);
        // const ComputedPrices = PriceCalculator(subTotal, additionalServices, discount, deliveryCharges, gst, false)

        // var data = [
        //     '\x1B' + '\x40',          // init
        //     '\x1B' + '\x61' + '\x31',
        //     // 'Beverly Hills, CA  90210' + '\x0A',
        //     '\x0A',                   // line break
        //     '\x1B' + '\x45' + '\x0D', // bold on
        //     RestaurantName + '\x0A',     // text and line break
        //     '\x0A',
        //     '\x1D' + '\x21' + '\x00', // standard font size
        //     '\x1B' + '\x45' + '\x0A', // bold off
        //     '\x1B' + '\x61' + '\x30',
        //     // //  '\x0A',                   // line break
        //     // line break
        //     '    Order Time:  ' + createdAt + '\x0A',
        //     // line break
        //     '    Print Time:  ' + formatDate(new Date()) + '\x0A',
        //     // line break
        //     '    Order Number:  ' + orderNumber + '\x0A',
        //     '    Name:  ' + name + '\x0A',
        //     '    Phone:  ' + phoneNo + '\x0A',
        //     '    Address:  ' + fullAddress + '\x0A',
        //     '\x0A',
        //     '\x1B' + '\x61' + '\x31',
        //     '------------------------------------------' + '\x0A',

        // ];
        // data.push('\x1B' + '\x61' + '\x31'); // center align

        // var namesArray = [];
        // for (let i of orders) {

        //     if (!i.variation) {
        //         let name = i.food.item.title
        //     }
        //     else if (i.variation.options.length == 1) {

        //         let name = i.food.item.title + "-" + i.variation.options[0].title;
        //     }
        //     else {
        //         let n;
        //         i.variation.options.forEach(element => {
        //             n = n + "-" + element.title
        //         });
        //         let name = i.food.item.title + "-" + n;

        //     }
        //     // let name = i.food.item.title + "-" + i.variation ? i.variation.options[0].title : '';

        //     namesArray.push(name);
        // }
        // for (let add of additionalServices) {
        //     let name = add.service;
        //     namesArray.push(name);
        // }

        // var longest = namesArray.sort(function (a, b) { return b.length - a.length; })[0];



        // var maxLength = longest.length;
        // for (let i of orders) {

        //     if (!i.variation) {
        //         let name = i.food.item.title
        //     }
        //     else if (i.variation.options.length == 1) {

        //         let name = i.food.item.title + "-" + i.variation.options[0].title;
        //     }
        //     else {
        //         let n;
        //         i.variation.options.forEach(element => {
        //             n = n + "-" + element.title
        //         });
        //         let name = i.food.item.title + "-" + n;

        //     }
        //     let count = i.counter;
        //     let price;
        //     if (!i.variation) {
        //         price = i.food.item.price;
        //     }
        //     else if (i.variation.options.length == 1) {

        //         price = i.variation.options[0].price
        //     }
        //     else {
        //         let p;
        //         i.variation.options.forEach(element => {
        //             p += element.price
        //         });
        //         price = p

        //     }

        //     data.push(name + '\t' + count + '\t' + price + ' PKR');
        //     data.push('\x0A');
        // }

        // for (let add of additionalServices) {
        //     let name = add.service;
        //     let count = 1;
        //     let price = add.price;
        //     data.push(name + this.spaces(maxLength - name.length) + '\t' + count + '\t' + price + ' PKR'); data.push('\x0A');
        // }

        // data.push('------------------------------------------' + '\x0A');
        // data.push('\x0A');
        // data.push('\x1B' + '\x61' + '\x32');
        // data.push('       Sub Total' + '     ' + ComputedPrices.subTotal + ' PKR    ' + '\x0A');
        // data.push('                -------------------------    ' + '\x0A');
        // data.push('Delivery Charges' + '     ' + ComputedPrices.deliveryCharges + ' PKR    ' + '\x0A');
        // data.push('                -------------------------    ' + '\x0A');
        // // data.push('GST' + '     ' + this.viewOrder.subTotal * this.viewOrder.gst / 100 + ' PKR    ' + '\x0A');
        // data.push('             GST' + '     ' + ComputedPrices.GST + ' PKR    ' + '\x0A');

        // data.push('                -------------------------    ' + '\x0A');
        // data.push('        Discount' + '     ' + '  ' + ComputedPrices.discount + ' %    ' + '\x0A');
        // data.push('                -------------------------    ' + '\x0A');

        // data.push('           Total' + '     ' + (ComputedPrices.total) + ' PKR    ' + '\x0A');

        // data.push('\x0A');
        // data.push('__________________________________________    ' + '\x0A');
        // data.push('\x0A');
        // data.push('\x0A');
        // data.push('\x1B' + '\x61' + '\x31');

        // data.push('Powered by fikifoo')
        // data.push('\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A'),
        //     data.push('\x1B' + '\x69');
        // data.push('\x10' + '\x14' + '\x01' + '\x00' + '\x05');

        var data = [
            '\x1B' + '\x40',          // init
            '\x1B' + '\x61' + '\x31',
            // 'Beverly Hills, CA  90210' + '\x0A',
            '\x0A',                   // line break
            '\x1B' + '\x45' + '\x0D', // bold on
            'bala tikka' + '\x0A',     // text and line break    
            'bala tikka' + '\x0A',     // text and line break    
            'bala tikka' + '\x0A',     // text and line break    
            'bala tikka' + '\x0A',     // text and line break       
        ]
        qz.print(config, data).catch(function (e) { console.error(e); });
    }

    render() {
        return <div>
            <h1>print</h1>
            <button onClick={this.print} >print</button></div>
    }
}

export default QZ;