QUnit.test("convpwd", function(assert){
	var instance = ConvPwd.prototype.getInstance();
	var lower = instance._consonants.concat(instance._vowels, instance._numbers).join("").toLowerCase().split("");
	var upper = lower.join("").toUpperCase().split("");

	assert.ok(
		(function(){
			return Boolean(ConvPwd.prototype.instances.length);
		})(),
		"Instances.length > 0"
	);

	assert.ok(
		(function(){
			var tmp = [
				instance._consonants,
				instance._vowels,
				instance._numbers
			];
			for(var c=0; c<tmp.length; c++){
				if (!tmp[c].length) return false;
			}
			return true;
		}),
		"init: vowerls, consonans, numbers"
	);

	assert.ok(
		(function(){
			var sym = instance.getSymbol({"case":"lower"});
			if (  lower.indexOf(sym) == -1  ) return false;

			sym = instance.getSymbol({"case":"upper"});
			if (  upper.indexOf(sym) == -1  ) return false;

			return true;
		})(),
		"getSymbol.case"
	);

	assert.ok(
		(function(){
			var sym = instance.getSymbol({"type":"vowel"}).toLowerCase();
			for(var c=0; c<1000; c++){
				if (  instance._vowels.indexOf(sym) == -1  ) return false;
			}
			return true;
		})(),
		"getSymbol.type"
	);

	assert.ok(
		(function(){
			var exclude = instance._consonants.concat(instance._vowels);
			var c, L;
			for(c=0, L=exclude.length; c<L; c++){
				exclude.push(exclude[c].toUpperCase());
			}
			var sym;
			for(c=0; c<100; c++){
				sym = instance.getSymbol({"exclude": exclude});
				if (  instance._numbers.indexOf(sym) == -1  ){
					return false;
				}
			}
			return true;
		})(),
		"getSymbol.exclude.onlyNumbersLeft"
	);

	assert.ok(
		(function(){
			var syl = instance.getSyllable({"length":2}).toLowerCase();
			if (syl.length != 2) return false;
			if (instance._vowels.indexOf(syl[1]) == -1) return false;

			syl = instance.getSyllable({"length":3}).toLowerCase();
			if (syl.length != 3) return false;
			if (instance._consonants.indexOf(syl[2]) == -1) return false;

			return true;
		})(),
		"Syllable.opened.closed"
	);

	assert.ok(
		(function(){
			var word = instance.getWord({"length":6, "case": "lower"});
			if (  lower.indexOf(word[0]) == -1  ) return false;

			for(var c=0; c<word.length; c++){
				if (  lower.indexOf(word[c]) == -1  ){
					return false;
				}
			}

			if (  instance._consonants.indexOf(word[0]) == -1  ) return false;
			if (  instance._vowels.indexOf(word[1]) == -1  ) return false;

			word = instance.getWord({"length":6, "capital": true});
			if (  upper.indexOf(word[0]) == -1  ) return false;

			if (word.length != 6) return false;

			return true;
		})(),
		"getWord.length.symType.case"
	);

	assert.ok(
		(function(){
			var pwds = instance.getPwd({
				"length":14,
				"amount": 100,
				"case": "lower",
				"withoutNumbers": true
			});
			for(var v=0; v<pwds.length; v++){
				var word = pwds[v];
				for(var c=0; c<word.length; c++){
					if (  instance._numbers.indexOf(word[c]) > -1  ){
						return false;
					}
				}
			}
			return true;
		})(),
		"getWord(length=14,withoutNumber=1)"
	);
});