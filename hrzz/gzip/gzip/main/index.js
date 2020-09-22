import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DButton,DTextarea,DatePicker} from '../../../public/mobile/components/index'
import Gzip from '../../../public/mobile/utils/gzip'
import './index.less'
import pako from './pako.js'
import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import Hex from "crypto-js/enc-hex";
const KEY_ENHANCE = Base64.parse("ZGIyMTM5NTYxYzlmZTA2OA==");
const base64EncodeChars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        //解压编码
const base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1,
        63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32,
        33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, -1, -1, -1, -1, -1);
class Zip extends Component{
    constructor (props) {
        super(props);
        this.state = {
         text:'',
         zip:'',
         cowboy:'',
         cookiets:'',
         aeskey:'',
         cfg :{
                iv: KEY_ENHANCE,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        }
    }

    componentDidMount () {
        // this.changeColor()
    }
    changeColor = () => {
        setInterval(()=>{
            var color="#f00|#0f0|#00f|#880|#808|#088|yellow|green|blue|gray|red";
            color=color.split("|");
            document.querySelector("#blink").style.color=color[parseInt(Math.random() * color.length)];
        },100)
        
    }
    decrypt = (message, key) => {
            var keyDigest = Base64.parse(key || '12345678912345678912345678912345');
            //  base64 解密  plaintext 只能是Hex编码的base64字节数组
            var plaintext = Base64.stringify(Hex.parse(Base64.parse(message).toString(Utf8)));
            var decrypted = CryptoJS["AES"].decrypt(plaintext, keyDigest, this.state.cfg);
            return decrypted.toString(Utf8);
    }

    encrypt = (message, key) => {
            var keyDigest = Base64.parse(key || '12345678912345678912345678912345');
            var encrypted = CryptoJS["AES"].encrypt(message, keyDigest, this.state.cfg);
            // 这里需要注意  先拿结果  然后再做base64 加密  encrypted.ciphertext 是个16进制字符串
            var ciphertext = Base64.stringify( Utf8.parse(encrypted.ciphertext.toString()) );
            return ciphertext;
        }
        
    zip = () => {
       let gziptools = new Gzip();
       let a = gziptools.unzip(this.state.text)
        this.setState({
            zip:JSON.stringify(a)
        })
        console.log(a)
    }

    decryptCowboy = (e) => {
            var aeskey = this.decrypt(e.target.value, '4fa8959db7b4423a99f056e299914128');
            aeskey = this.decrypt(aeskey, '4fa8959db7b4423a99f056e299914128');
            var cookiets = this.state.cookiets;
            aeskey = cookiets + aeskey.substring(0, aeskey.length - cookiets.length);
            this.setState({
                aeskey:aeskey,
                cowboy:e.target.value
            })
            
        } 
    decryptCowboyX = (e) => {
            var aeskey = this.decrypt(this.state.cowboy, '4fa8959db7b4423a99f056e299914128');
            aeskey = this.decrypt(aeskey, '4fa8959db7b4423a99f056e299914128');
            var cookiets = e.target.value;
            aeskey = cookiets + aeskey.substring(0, aeskey.length - cookiets.length);
            this.setState({
                aeskey:aeskey,
                cookiets:e.target.value
            })
            
        } 
       
    handelChange = (e) => {
        this.setState({
            text:e.target.value
        })
    }
    copy = () => {
        var text = document.getElementById("text");
            text.select(); 
            document.execCommand("copy"); 
            showError("复制成功");
    }
    decryptNoZip = () => {
            var aeskey = this.state.aeskey
            if(!aeskey) aeskey = '4fa8959db7b4423a99f056e299914128';
            this.setState({
                zip:this.encrypt(this.state.text, aeskey)
            })
        } 
    decryptAndUnzipX = () => {
            var plaintext = this.decrypt(this.state.text,this.state.aeskey);
            var gstr = this.decodeBase64(plaintext);
            var strData = pako.inflate(gstr, {
                to: "string"
            });
            try {
                strData = JSON.parse(strData);
            } catch (error) {}
            console.log(strData);
            strData = JSON.stringify(strData, null, 4);
             this.setState({
                zip:strData
            })
        } 
    decodeBase64 = (str) => {
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                /* c1 */
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1) break;
                /* c2 */
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1) break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                /* c3 */
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61) return out;
                    c3 = base64DecodeChars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1) break;
                out += String.fromCharCode(
                    ((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2)
                );
                /* c4 */
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61) return out;
                    c4 = base64DecodeChars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1) break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        }
    render () {
        return (
            <div className="zip"> 
            {/* <p id="blink">这是一个任性的标题</p> */}
                <input value={this.state.cowboy} onChange={this.decryptCowboy.bind(this)} placeholder={'localStorage中的cowboy'} />
                    <br />
                    <input value={this.state.cookiets} onChange={this.decryptCowboyX.bind(this)} placeholder={'cookies中的cookiets'}  />
                    <br />

               
                    <input value={this.state.aeskey} placeholder={'秘钥,自动生成'}/>
                    <br />
            
                <textarea type="text" onChange={this.handelChange.bind(this)}  className="text" defaultValue = {this.state.text} />
                
                <div className="box">
                    <div className="button" onClick = {this.decryptAndUnzipX}>解密</div>
                     <div className="copy" onClick = {this.zip}>解压</div>
                    <div className="copy" onClick = {this.copy}>一键复制↓</div>
                    <a href="https://www.json.cn/" target="_blank" >点我JSON格式化跳转</a>
                </div>
                
                <textarea type="text" id="text" className="text" value = {this.state.zip} />
            </div>
        )
    }
}

ReactDOM.render(<Zip/>, document.getElementById('app'));