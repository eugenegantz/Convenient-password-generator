#Methods
--------------------------------------
####getInstances####
return instance of object.
Initialize new or returns already initialized one.
```
var convPwdInstance = ConvPwd.prototype.getInstance();
```

####getPwd (Object arg)####
```
var arg = {
	"case": String ("lower"|"upper"|"random"),                 // optional // default: "random"
	"length": Numeric integer,                                        // Length of passwords // optional // default: 8
	"lodash": Boolean,                                                   // Use underscore as words separator // optional // default: false
	"amount": Numeric integer,                                      // Amount of passwords // optional // default: true
	"memorable": Boolean,                                            // Generates password that can be easy remembered // optional // default: false
	"withoutNumbers": Boolean,                                    // optional // default: false,
	"obvious": Boolean,                                                 // optional // default: false,
	"capital": Boolean                                                    // optional // incompatible with case
}
var convPwdInstance = ConvPwd.prototype.getInstance();
var sym = convPwdInstance.getWord(arg);

```

####getSymbol (Object arg)####
Returns random symbol from library;
```
var arg = {
    "case": String ("lower"|"upper"|"random"),                 // optional // default: "random"
    "exclude": Array, // excludes symbols from selection,    // optional
    "type": String ("vowel"|"consonant",|"number")          // optional
}
var convPwdInstance = ConvPwd.prototype.getInstance();
var sym = convPwdInstance.getSymbol(arg);
```

####getSyllable (Object arg)####
Returns two symbols that make syllable.

```
var arg = {
	"case": String ("lower"|"upper"|"random"),                  // optional
	"length": Numeric (1 < length < 4)                            // Length of syllable. 2 = open syllable, 3 = closed // optional // default: 2
}
var convPwdInstance = ConvPwd.prototype.getInstance();
var sym = convPwdInstance.getSyllable(arg);

```

####getWord (Object arg)####
```
var arg = {
	"case": String ("lower"|"upper"|"random"),                  // optional // default: "random"
	"length": Numeric                                                    // optional // default: 3
}
var convPwdInstance = ConvPwd.prototype.getInstance();
var sym = convPwdInstance.getWord(arg);

```
