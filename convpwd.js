//===============================
// Convient passwords
var ConvPwd = function(){
	this.init();
};

ConvPwd.prototype = {
	"init": function(){
		console.log("pwds_init");
		this.password_length_limit = 1000;
		this.password_amount_limit = 100;
		this.instances.push(this);
	},

	"instances": [],

	"getInstance": function(){
		return this.instances.length ? this.instances[0] : new ConvPwd();
	},
	
	"rand": function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	
	"_vowels": (function(){
		return "aeiouy".split("");
	})(),
	
	
	"_consonants": (function(){
		return "bcdfghjklmnpqrstvxz".split("");
	})(),
	
	
	"_numbers": (function(){
		return "1234567890".split("");
	})(),
	
	
	"_unobviousLetters": ["0","3","e","i","o","p","a","g","q","k","l","x","c","m","n","y"],
	
	
	"getSymbol": function(arg){
		if (typeof arg != "object") arg = {};
		
		var cases = ["lower","upper"];
		
		var type = 
			typeof arg.type == "string" 
			&& ["consonant","vowel","number"].indexOf(arg.type.toLowerCase()) > -1 
				? arg.type.toLowerCase()
				: "random";
		
		var exclude = typeof arg.exclude == "object" && Array.isArray(arg.exclude) ? arg.exclude : [];
		
		var case_ = typeof arg.case == "string" && cases.indexOf(arg.case.toLowerCase()) > -1 ? arg.case.toLowerCase() : "random";
		
		// ................................................
		
		var sym, tmp, symPool, c;
		
		// ................................................
		
		if (type == "consonant"){
			symPool = this._consonants;
			
		} else if (type == "vowel"){
			symPool = this._vowels; 
			
		} else if (type == "numbers"){
			symPool = this._numbers;
			
		} else {
			symPool = this._vowels.concat(this._consonants, this._numbers);
			
		}

		// ................................................
		
		tmp = [];
		
		for(c=0; c<symPool.length; c++){
			if (  case_ == "random"  ){
				tmp.push(symPool[c].toLowerCase());
				
				if (  this._numbers.indexOf(symPool[c]) == -1  ){
					tmp.push(symPool[c].toUpperCase());
				}
				
			} else if (case_ == "lower"){
				tmp.push(symPool[c].toLowerCase());
				
			} else if (  case_ == "upper"  ){
				tmp.push(symPool[c].toUpperCase());
			
			}
		}
		
		symPool = tmp;
		
		// ................................................
		
		if (  exclude.length  ){
			tmp = [];
			for(c=0; c<symPool.length; c++){
				if (  exclude.indexOf(symPool[c]) > -1  ) continue;
				tmp.push(symPool[c]);
			}
			symPool = tmp;
		}
		
		// ................................................
		
		sym = symPool[this.rand(0, symPool.length-1)]; 
		
		// ................................................
		
		return sym;
	},
	
	
	"getSyllable": function(arg){
	
		if (typeof arg != "object") arg = {};
	
		var cases = ["lower","upper"];
	
		var exclude = typeof arg.exclude == "object" && Array.isArray(arg.exclude) ? arg.exclude : [];
		
		var case_ = typeof arg.case == "string" && cases.indexOf(arg.case.toLowerCase()) > -1 ? arg.case.toLowerCase() : "random";
		
		var length = typeof arg.length != "undefined" && !isNaN(arg.length) ? arg.length : 2;
		
		if ( length < 2 || length > 3 ) length = 2;
		
		var a = this.getSymbol({
			"type": "consonant",
			"exclude": exclude,
			"case": case_
		});
		
		var b = this.getSymbol({
			"type": "vowel",
			"exclude": exclude,
			"case": case_
		});
		
		var c = "";
		
		if (  length == 3  ){
			c = this.getSymbol({
				"type": "consonant",
				"exclude": exclude,
				"case": case_
			});
		}
		
		return a + b + c;
		
	},
	
	
	"getWord": function(arg){
		
		// TODO: capital, length;

		var cases = ["lower","upper"];
		
		if (typeof arg != "object") arg = {};
		
		var length = typeof arg.length != "undefined" && !isNaN(arg.length) ? arg.length : 3;
		
		var case_ = typeof arg.case == "string" && cases.indexOf(arg.case.toLowerCase()) > -1 ? arg.case.toLowerCase() : "random";
		
		var capital = typeof arg.capital == "undefined" ? false : Boolean(arg.capital);

		var c, word = [];
		
		var residueCompLength = 0;
		var integerCompAmount = 1;
		var intergerCompLength = 2;
		
		if (length % 2 > 1){
			residueCompLength = length % 2;
			integerCompAmount = Math.floor(length / 2);
			intergerCompLength = 2;
			
		} else if (length % 3 > 1){
			residueCompLength = length % 3;
			integerCompAmount = Math.floor(length / 3);
			intergerCompLength = 3;
			
		} else if (  length % 2 == false  ){
			integerCompAmount = length / 2;
			intergerCompLength = 2;
		
		} else if (  length % 3 == false  ){
			integerCompAmount = length / 3;
			intergerCompLength = 3;
		
		} else {
			integerCompAmount = Math.floor(length / 3);
			intergerCompLength = 3;
			residueCompLength = 1;
		}

		for(c=0; c<integerCompAmount; c++){
			word.push(this.getSyllable({"length": intergerCompLength, "case": case_}));
		}
		
		if (  residueCompLength == 1  ){
			word.push(this.getSymbol({"case":case_,"type":"vowel"}));
		
		} else if (  residueCompLength  ){
			word.push(this.getSyllable({"length": residueCompLength, "case": case_}));
			
		}

		word.sort(function(){
			return Math.round(Math.random()) ? 1 : -1;
		});
		
		word = word.join("");
		
		if (  capital  ){
			word = word.toLowerCase();
			word = word.slice(0,1).toUpperCase() + word.slice(1,word.length);
		}
		
		return word;
		
	},
	
	
	"getNumber": function(arg){
	
		if (typeof arg != "object") arg = {};
		
		var tmp, c;
		
		var exclude = typeof arg.exclude == "object" && Array.isArray(arg.exclude) ? arg.exclude : [];
		
		var length = typeof arg.length != "undefined" && !isNaN(arg.length) ? arg.length : 1;
		
		var numberPool = this._numbers;
		
		if (  exclude.length  ){
			tmp = [];
			for(c=0; c<numberPool.length; c++){
				if (  exclude.indexOf(numberPool[c]) > -1  ) continue;
				tmp.push(numberPool[c]);
			}
			numberPool = tmp;
		}
		
		if (  !numberPool.length  ) return "";
		
		var number = "";
		
		for(c=0; c<length; c++){
			number += numberPool[this.rand(0, numberPool.length-1)];
		}
		
		return number;
		
	},
	
	
	"getPwd": function(arg){
	
		if (typeof arg != "object") arg = {};
	
		var amount = typeof arg.amount == "undefined" || isNaN(arg.amount)		? 1 : arg.amount;

		var pwds = [];

		for (var cc=0; cc<amount; cc++) {
			pwds.push(
				this._getPwd.apply(this, arguments)
			);
			
			if (cc > this.password_amount_limit) break;
		}

		return pwds;
		
	},
	
	
	"_getPwd": function(arg){

		var c;

		if (typeof arg != "object") arg = {};
		
		var length_					= typeof arg.length == "undefined" || isNaN(arg.length)		? 8 : arg.length;
		var obvious					= typeof arg.obvious == "undefined"									? 0 : Boolean(arg.obvious);
		var memorable			= typeof arg.memorable == "undefined"							? 1 : Boolean(arg.memorable);
		var case_					= typeof arg.case != "string" || !arg.case							? "lower" : arg.case;
		var withoutNumbers		= typeof arg.withoutNumbers != "undeinfed"						? Boolean(arg.withoutNumbers) : 0;
		var lodash					= typeof arg.lodash != "undefined"									? Boolean(arg.lodash) : 0;
		var caseCapital				= typeof arg.capital != "undefined"									? Boolean(arg.capital) : 1;

		// case = lower|upper|random

		var minWordLen = 6;

		var exclude = [];
		
		if (  obvious  ){
			exclude = ["0","3","e","i","o","p","a","g","q","k","l","x","c","m","n","y"];
		}

		if (  withoutNumbers  ){
			exclude = exclude.concat(this._numbers);
		}

		var pwd = "";

		var sym, tmpVowel, words = [];

		if (
			length_ > minWordLen
			&& memorable
			&& !obvious
		){

			var residueCompLength = length_ % minWordLen;
			var integerCompAmount = Math.floor(length_ / minWordLen);

			for(c=0; c<integerCompAmount; c++){
				words.push(
					this.getWord({
						"length": minWordLen,
						"capital": caseCapital,
						"case": case_
					})
				);

				if (
					--residueCompLength > 0
					&& lodash
				){
					words.push("_");
				}
			}

		}

		words = words.join("");

		pwd += words;

		for(c=0;;){

			if (  pwd.length >= length_  ) break;

			if (  c > this.password_length_limit  ) break;

			if (  pwd.length - words.length > residueCompLength  ) break;

			sym = this.getSymbol({
				"case": case_,
				"exclude": exclude
			});

			if (
				memorable 
				&& !obvious
				&& case_ != "random"
			){
				if (  this._numbers.indexOf(sym) > -1  ){
					pwd += sym;
					pwd += "0";
					
				} else if (  this._consonants.indexOf(sym.toLowerCase()) > -1  ) {
					pwd += sym;
					tmpVowel = this.getSymbol({
						"type":"vowel", 
						"exclude":exclude,
						"case": case_
					});
					pwd += tmpVowel;
					
				}
				
			} else {
				pwd += sym;
				
			}

		}

		return pwd.slice(0, length_);
		
	}
};