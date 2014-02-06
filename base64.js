(function(win){
    var b64={};
    b64._map = function(bits){
        var indx = parseInt(bits,2);
        var m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        return m.charAt(indx);
    };
    b64._padBinary = function(asci){
        if(asci=='') return '00000000';
        if(isNaN(asci)) return false;
        var b=asci.toString(2);
        return Array(9-b.length).join('0')+b;
    };
    b64.encode = function(str){
        var zeroPadBit = '000000';
        if (!str) return 'A==';
        var leng = str.length;
        var enc64 = '';
        for(i=0;x=str.charCodeAt(i),y=str.charAt(i+1)?str.charCodeAt(i+1):'',z=str.charAt(i+2)?str.charCodeAt(i+2):'',i<leng;i+=3)
        {
            var bits=b64._padBinary(x)+b64._padBinary(y)+b64._padBinary(z);
            var b = [bits.substr(0,6),bits.substr(6,6),bits.substr(12,6),bits.substr(18,6)];
            if (b[2]==zeroPadBit && b[3]==zeroPadBit)
                enc64 += b64._map(b[0])+b64._map(b[1])+'==';
            else if(b[3]==zeroPadBit)
                enc64 += b64._map(b[0])+b64._map(b[1])+b64._map(b[2])+'=';
            else
                enc64 += b64._map(b[0])+b64._map(b[1])+b64._map(b[2])+b64._map(b[3]);
        }
        return enc64;
    }
    b64._depadBinary = function(asci){
        if(asci=='') return '000000';
        if(isNaN(asci)) return false;
        var code = 0;
        if(asci>=65 && asci<=90)
        {
            code=asci-65;
        }else if(asci>=97 && asci<=122)
        {
            code=asci-71;
        }else if(asci>=48 && asci<=57)
        {
            code=asci+4;
        }else if(String.fromCharCode(asci)=='+') code=62
        else code=63;
        var b=code.toString(2);
        return Array(7-b.length).join('0')+b;
    }
    b64.decode = function(enc){
        var leng = enc.length;
        if (leng%4!==0) return false;
        var dec64='';
        for(i=0;w=enc.charCodeAt(i),x=enc.charCodeAt(i+1),y=enc.charCodeAt(i+2),z=enc.charCodeAt(i+3),i<leng;i+=4)
        {
            var bits=b64._depadBinary(w)+b64._depadBinary(x)+b64._depadBinary(y)+b64._depadBinary(z);
            if(z==61 && y==61)
            {
                dec64 += String.fromCharCode(parseInt(bits.substr(0,8),2));
            }else if(z==61 && y!=61)
            {
                dec64 += String.fromCharCode(parseInt(bits.substr(0,8),2));
                dec64 += String.fromCharCode(parseInt(bits.substr(8,8),2));
            }else
            {
                dec64 += String.fromCharCode(parseInt(bits.substr(0,8),2));
                dec64 += String.fromCharCode(parseInt(bits.substr(8,8),2));
                dec64 += String.fromCharCode(parseInt(bits.substr(16,8),2));
            }
        }
        return dec64;
    }
    win.base64 = b64 = win.Base64 = b64;
})(window);
