import{l as H}from"./q-CkRVRTAV.js";import{w as r0}from"./q-CkRVRTAV.js";import{G as z}from"./q-COPIWoyd.js";var J=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Q(u){return u&&u.__esModule&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u}function Y(u){if(u.__esModule)return u;var o=u.default;if(typeof o=="function"){var s=function g(){return this instanceof g?Reflect.construct(o,arguments,this.constructor):o.apply(this,arguments)};s.prototype=o.prototype}else s={};return Object.defineProperty(s,"__esModule",{value:!0}),Object.keys(u).forEach(function(g){var I=Object.getOwnPropertyDescriptor(u,g);Object.defineProperty(s,g,I.get?I:{enumerable:!0,get:function(){return u[g]}})}),s}function Z(u){throw new Error('Could not dynamically require "'+u+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var q={exports:{}};const K={},k=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"})),P=Y(k);(function(u){/**
 * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/bcrypt.js for details
 */(function(o,s){typeof Z=="function"&&u&&u.exports?u.exports=s():(o.dcodeIO=o.dcodeIO||{}).bcrypt=s()})(J,function(){var o={},s=null;function g(c){if(u&&u.exports)try{return P.randomBytes(c)}catch{}try{var a;return(self.crypto||self.msCrypto).getRandomValues(a=new Uint32Array(c)),Array.prototype.slice.call(a)}catch{}if(!s)throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");return s(c)}var I=!1;try{g(1),I=!0}catch{}s=null,o.setRandomFallback=function(c){s=c},o.genSaltSync=function(c,a){if(c=c||A,typeof c!="number")throw Error("Illegal arguments: "+typeof c+", "+typeof a);c<4?c=4:c>31&&(c=31);var f=[];return f.push("$2a$"),c<10&&f.push("0"),f.push(c.toString()),f.push("$"),f.push(U(g(E),E)),f.join("")},o.genSalt=function(c,a,f){if(typeof a=="function"&&(f=a,a=void 0),typeof c=="function"&&(f=c,c=void 0),typeof c>"u")c=A;else if(typeof c!="number")throw Error("illegal arguments: "+typeof c);function e(x){y(function(){try{x(null,o.genSaltSync(c))}catch(d){x(d)}})}if(f){if(typeof f!="function")throw Error("Illegal callback: "+typeof f);e(f)}else return new Promise(function(x,d){e(function(b,t){if(b){d(b);return}x(t)})})},o.hashSync=function(c,a){if(typeof a>"u"&&(a=A),typeof a=="number"&&(a=o.genSaltSync(a)),typeof c!="string"||typeof a!="string")throw Error("Illegal arguments: "+typeof c+", "+typeof a);return O(c,a)},o.hash=function(c,a,f,e){function x(d){typeof c=="string"&&typeof a=="number"?o.genSalt(a,function(b,t){O(c,t,d,e)}):typeof c=="string"&&typeof a=="string"?O(c,a,d,e):y(d.bind(this,Error("Illegal arguments: "+typeof c+", "+typeof a)))}if(f){if(typeof f!="function")throw Error("Illegal callback: "+typeof f);x(f)}else return new Promise(function(d,b){x(function(t,r){if(t){b(t);return}d(r)})})};function D(c,a){for(var f=0,e=0,x=0,d=c.length;x<d;++x)c.charCodeAt(x)===a.charCodeAt(x)?++f:++e;return f<0?!1:e===0}o.compareSync=function(c,a){if(typeof c!="string"||typeof a!="string")throw Error("Illegal arguments: "+typeof c+", "+typeof a);return a.length!==60?!1:D(o.hashSync(c,a.substr(0,a.length-31)),a)},o.compare=function(c,a,f,e){function x(d){if(typeof c!="string"||typeof a!="string"){y(d.bind(this,Error("Illegal arguments: "+typeof c+", "+typeof a)));return}if(a.length!==60){y(d.bind(this,null,!1));return}o.hash(c,a.substr(0,29),function(b,t){b?d(b):d(null,D(t,a))},e)}if(f){if(typeof f!="function")throw Error("Illegal callback: "+typeof f);x(f)}else return new Promise(function(d,b){x(function(t,r){if(t){b(t);return}d(r)})})},o.getRounds=function(c){if(typeof c!="string")throw Error("Illegal arguments: "+typeof c);return parseInt(c.split("$")[2],10)},o.getSalt=function(c){if(typeof c!="string")throw Error("Illegal arguments: "+typeof c);if(c.length!==60)throw Error("Illegal hash length: "+c.length+" != 60");return c.substring(0,29)};var y=typeof process<"u"&&process&&typeof process.nextTick=="function"?typeof setImmediate=="function"?setImmediate:process.nextTick:setTimeout;function G(c){var a=[],f=0;return L.encodeUTF16toUTF8(function(){return f>=c.length?null:c.charCodeAt(f++)},function(e){a.push(e)}),a}var F="./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),v=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,54,55,56,57,58,59,60,61,62,63,-1,-1,-1,-1,-1,-1,-1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,-1,-1,-1,-1,-1,-1,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,-1,-1,-1,-1,-1],C=String.fromCharCode;function U(c,a){var f=0,e=[],x,d;if(a<=0||a>c.length)throw Error("Illegal len: "+a);for(;f<a;){if(x=c[f++]&255,e.push(F[x>>2&63]),x=(x&3)<<4,f>=a){e.push(F[x&63]);break}if(d=c[f++]&255,x|=d>>4&15,e.push(F[x&63]),x=(d&15)<<2,f>=a){e.push(F[x&63]);break}d=c[f++]&255,x|=d>>6&3,e.push(F[x&63]),e.push(F[d&63])}return e.join("")}function j(c,a){var f=0,e=c.length,x=0,d=[],b,t,r,n,i,l;if(a<=0)throw Error("Illegal len: "+a);for(;f<e-1&&x<a&&(l=c.charCodeAt(f++),b=l<v.length?v[l]:-1,l=c.charCodeAt(f++),t=l<v.length?v[l]:-1,!(b==-1||t==-1||(i=b<<2>>>0,i|=(t&48)>>4,d.push(C(i)),++x>=a||f>=e)||(l=c.charCodeAt(f++),r=l<v.length?v[l]:-1,r==-1)||(i=(t&15)<<4>>>0,i|=(r&60)>>2,d.push(C(i)),++x>=a||f>=e)));)l=c.charCodeAt(f++),n=l<v.length?v[l]:-1,i=(r&3)<<6>>>0,i|=n,d.push(C(i)),++x;var h=[];for(f=0;f<x;f++)h.push(d[f].charCodeAt(0));return h}var L=function(){var c={};return c.MAX_CODEPOINT=1114111,c.encodeUTF8=function(a,f){var e=null;for(typeof a=="number"&&(e=a,a=function(){return null});e!==null||(e=a())!==null;)e<128?f(e&127):e<2048?(f(e>>6&31|192),f(e&63|128)):e<65536?(f(e>>12&15|224),f(e>>6&63|128),f(e&63|128)):(f(e>>18&7|240),f(e>>12&63|128),f(e>>6&63|128),f(e&63|128)),e=null},c.decodeUTF8=function(a,f){for(var e,x,d,b,t=function(r){r=r.slice(0,r.indexOf(null));var n=Error(r.toString());throw n.name="TruncatedError",n.bytes=r,n};(e=a())!==null;)if(!(e&128))f(e);else if((e&224)===192)(x=a())===null&&t([e,x]),f((e&31)<<6|x&63);else if((e&240)===224)((x=a())===null||(d=a())===null)&&t([e,x,d]),f((e&15)<<12|(x&63)<<6|d&63);else if((e&248)===240)((x=a())===null||(d=a())===null||(b=a())===null)&&t([e,x,d,b]),f((e&7)<<18|(x&63)<<12|(d&63)<<6|b&63);else throw RangeError("Illegal starting byte: "+e)},c.UTF16toUTF8=function(a,f){for(var e,x=null;(e=x!==null?x:a())!==null;){if(e>=55296&&e<=57343&&(x=a())!==null&&x>=56320&&x<=57343){f((e-55296)*1024+x-56320+65536),x=null;continue}f(e)}x!==null&&f(x)},c.UTF8toUTF16=function(a,f){var e=null;for(typeof a=="number"&&(e=a,a=function(){return null});e!==null||(e=a())!==null;)e<=65535?f(e):(e-=65536,f((e>>10)+55296),f(e%1024+56320)),e=null},c.encodeUTF16toUTF8=function(a,f){c.UTF16toUTF8(a,function(e){c.encodeUTF8(e,f)})},c.decodeUTF8toUTF16=function(a,f){c.decodeUTF8(a,function(e){c.UTF8toUTF16(e,f)})},c.calculateCodePoint=function(a){return a<128?1:a<2048?2:a<65536?3:4},c.calculateUTF8=function(a){for(var f,e=0;(f=a())!==null;)e+=c.calculateCodePoint(f);return e},c.calculateUTF16asUTF8=function(a){var f=0,e=0;return c.UTF16toUTF8(a,function(x){++f,e+=c.calculateCodePoint(x)}),[f,e]},c}();Date.now=Date.now||function(){return+new Date};var E=16,A=10,X=16,V=100,R=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],N=[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946,1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055,3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504,976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462],$=[1332899944,1700884034,1701343084,1684370003,1668446532,1869963892];function _(c,a,f,e){var x,d=c[a],b=c[a+1];return d^=f[0],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[1],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[2],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[3],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[4],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[5],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[6],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[7],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[8],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[9],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[10],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[11],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[12],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[13],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[14],x=e[d>>>24],x+=e[256|d>>16&255],x^=e[512|d>>8&255],x+=e[768|d&255],b^=x^f[15],x=e[b>>>24],x+=e[256|b>>16&255],x^=e[512|b>>8&255],x+=e[768|b&255],d^=x^f[16],c[a]=b^f[X+1],c[a+1]=d,c}function m(c,a){for(var f=0,e=0;f<4;++f)e=e<<8|c[a]&255,a=(a+1)%c.length;return{key:e,offp:a}}function B(c,a,f){for(var e=0,x=[0,0],d=a.length,b=f.length,t,r=0;r<d;r++)t=m(c,e),e=t.offp,a[r]=a[r]^t.key;for(r=0;r<d;r+=2)x=_(x,0,a,f),a[r]=x[0],a[r+1]=x[1];for(r=0;r<b;r+=2)x=_(x,0,a,f),f[r]=x[0],f[r+1]=x[1]}function W(c,a,f,e){for(var x=0,d=[0,0],b=f.length,t=e.length,r,n=0;n<b;n++)r=m(a,x),x=r.offp,f[n]=f[n]^r.key;for(x=0,n=0;n<b;n+=2)r=m(c,x),x=r.offp,d[0]^=r.key,r=m(c,x),x=r.offp,d[1]^=r.key,d=_(d,0,f,e),f[n]=d[0],f[n+1]=d[1];for(n=0;n<t;n+=2)r=m(c,x),x=r.offp,d[0]^=r.key,r=m(c,x),x=r.offp,d[1]^=r.key,d=_(d,0,f,e),e[n]=d[0],e[n+1]=d[1]}function M(c,a,f,e,x){var d=$.slice(),b=d.length,t;if(f<4||f>31)if(t=Error("Illegal number of rounds (4-31): "+f),e){y(e.bind(this,t));return}else throw t;if(a.length!==E)if(t=Error("Illegal salt length: "+a.length+" != "+E),e){y(e.bind(this,t));return}else throw t;f=1<<f>>>0;var r,n,i=0,l;Int32Array?(r=new Int32Array(R),n=new Int32Array(N)):(r=R.slice(),n=N.slice()),W(a,c,r,n);function h(){if(x&&x(i/f),i<f)for(var w=Date.now();i<f&&(i=i+1,B(c,r,n),B(a,r,n),!(Date.now()-w>V)););else{for(i=0;i<64;i++)for(l=0;l<b>>1;l++)_(d,l<<1,r,n);var p=[];for(i=0;i<b;i++)p.push((d[i]>>24&255)>>>0),p.push((d[i]>>16&255)>>>0),p.push((d[i]>>8&255)>>>0),p.push((d[i]&255)>>>0);if(e){e(null,p);return}else return p}e&&y(h)}if(typeof e<"u")h();else for(var T;;)if(typeof(T=h())<"u")return T||[]}function O(c,a,f,e){var x;if(typeof c!="string"||typeof a!="string")if(x=Error("Invalid string / salt: Not a string"),f){y(f.bind(this,x));return}else throw x;var d,b;if(a.charAt(0)!=="$"||a.charAt(1)!=="2")if(x=Error("Invalid salt version: "+a.substring(0,2)),f){y(f.bind(this,x));return}else throw x;if(a.charAt(2)==="$")d="\0",b=3;else{if(d=a.charAt(2),d!=="a"&&d!=="b"&&d!=="y"||a.charAt(3)!=="$")if(x=Error("Invalid salt revision: "+a.substring(2,4)),f){y(f.bind(this,x));return}else throw x;b=4}if(a.charAt(b+2)>"$")if(x=Error("Missing salt rounds"),f){y(f.bind(this,x));return}else throw x;var t=parseInt(a.substring(b,b+1),10)*10,r=parseInt(a.substring(b+1,b+2),10),n=t+r,i=a.substring(b+3,b+25);c+=d>="a"?"\0":"";var l=G(c),h=j(i,E);function T(w){var p=[];return p.push("$2"),d>="a"&&p.push(d),p.push("$"),n<10&&p.push("0"),p.push(n.toString()),p.push("$"),p.push(U(h,h.length)),p.push(U(w,$.length*4-1)),p.join("")}if(typeof f>"u")return T(M(l,h,n));M(l,h,n,function(w,p){w?f(w,null):f(null,T(p))},e)}return o.encodeBase64=U,o.decodeBase64=j,o})})(q);var S=q.exports;const x0=Q(S),e0=z(H("s_VNjpddvNZJk")),c0=async(u,o)=>{const s=o||await e0(u);return await x0.compare(u,s)};export{r0 as _hW,c0 as s_lNHEBVa8q6U};
