function writeContent (content) {document.querySelector("#content").innerHTML = content};
function pickRandom (array) {return array[Math.floor(Math.random() * array.length)]};
function randomRange (min, max) {return Math.floor(Math.random() * (max - min + 1)) + min};

function namegen(count) {	
    // Stolen from https://github.com/hbi99/namegen
	var vowels = {  '1': ["b", "c", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"],
			'2': ["a", "e", "o", "u"],
			'3': ["br", "cr", "dr", "fr", "gr", "pr", "str", "tr", "bl", "cl", "fl", "gl", "pl", "sl", "sc", "sk", "sm", "sn", "sp", "st", "sw", "ch", "sh", "th", "wh"],
			'4': ["ae", "ai", "ao", "au", "a", "ay", "ea", "ei", "eo", "eu", "e", "ey", "ua", "ue", "ui", "uo", "u", "uy", "ia", "ie", "iu", "io", "iy", "oa", "oe", "ou", "oi", "o", "oy"],
			'5': ["turn", "ter", "nus", "rus", "tania", "hiri", "hines", "gawa", "nides", "carro", "rilia", "stea", "lia", "lea", "ria", "nov", "phus", "mia", "nerth", "wei", "ruta", "tov", "zuno", "vis", "lara", "nia", "liv", "tera", "gantu", "yama", "tune", "ter", "nus", "cury", "bos", "pra", "thea", "nope", "tis", "clite", "won"],
			'6': ["una", "ion", "iea", "iri", "illes", "ides", "agua", "olla", "inda", "eshan", "oria", "ilia", "erth", "arth", "orth", "oth", "illon", "ichi", "ov", "arvis", "ara", "ars", "yke", "yria", "onoe", "ippe", "osie", "one", "ore", "ade", "adus", "urn", "ypso", "ora", "iuq", "orix", "apus", "ion", "eon", "eron", "ao", "omia", "sar"] },
		mtx = [[1,1, 2,2, 5,5],
			[2,2, 3,3, 6,6],
			[3,3, 4,4, 5,5],
			[4,4, 3,3, 6,6],
			[3,3, 4,4, 2,2, 5,5],
			[2,2, 1,1, 3,3, 6,6],
			[3,3, 4,4, 2,2, 5,5],
			[4,4, 3,3, 1,1, 6,6],
			[3,3, 4,4, 1,1, 4,4, 5,5],
			[4,4, 1,1, 4,4, 3,3, 6,6]],
		fn = function(i) { return Math.floor(Math.random() * vowels[i].length); },
		ret = [],
		name,
		comp,
		i, il,
		c = 0;
	
	for (; c<count; c++) {
		name = '';
		comp = mtx[c % mtx.length];
		for (i=0, il=comp.length/2; i<il; i++) {
			name += vowels[comp[i*2]][fn(comp[i*2+1])];
		}
		ret.push(name);
	}

	return ret;
};

///////////////////////////// Planet Generation /////////////////////////////

function gentempfromtype(type) {
    // Generates a temperature from a type of planet
    if (type == "hellish") {
        // Hellish planets are always hot. They contain molten lava and are usually volcanically active.
        return pickRandom(["hot", "very hot", "extremely hot", "scorching"]);
    } else if (type == "ice giant") {
        // Ice giants are always cold. They are usually covered in ice and snow.
        return pickRandom(["cold", "very cold", "extremely cold", "freezing"]);
    } else if (type == "gas giant") {
        // Gas giants are always cold.
        return pickRandom(["cold", "very cold", "extremely cold", "freezing"]);
    } else if (type == "desert") {
        // Deserts can be either extremely hot or cold.
        return pickRandom(["hot", "very hot", "extremely hot", "scorching", "cold", "very cold", "extremely cold", "freezing"]);
    } else if (type == "frozen planet") {
        // Frozen planets are always cold (no duh).
        return pickRandom(["cold", "very cold", "extremely cold", "freezing"]);
    } else if (type == "humid (jungle)") {
        // Humid planets are within the range of warm to reasonable hot (around 80 degrees Fahrenheit).
        return pickRandom(["warm", "hot", "reasonably hot", "comfortable", "room-temperature"]);
    } else if (type == "water-world") {
        // Water worlds are always warm.
        return pickRandom(["warm", "hot", "reasonably hot", "comfortable", "room-temperature"]);
    } else {
        // All other planets have a random temperature.
        return pickRandom(["cold", "very cold", "extremely cold", "freezing", "warm", "hot", "reasonably hot", "comfortable", "room-temperature", "scorching"]);
    }
}

function genatmospherefromtype(type) {
    if (type == "gas giant") {
        return "toxic";
    } else if (type == "hellish") {
        return "breathable (oxygen-poor)";
    } else {
        return pickRandom(["none", "thin", "thick", "dense", "toxic", "breathable", "breathable (oxygen-rich)", "breathable (oxygen-poor)", "breathable (earth-like)"]);
    }
}

function gencivfromlife(life) {
    if (life == "none" || life == "microscopic" || life == "simple") {
        return "none";
    } else if (life == "complex") {
        return "primitive";
    } else if (life == "intelligent") {
        return pickRandom(["stone-age", "bronze-age/seafaring", "iron-age/agricultural", "at war (primitive)", "at war (nuclear)", "at war (verge of extinction)", "dystopia", "utopia", "industrial (developing)", "industrial (unstable)", "industrial", "space-age", "advanced", "medieval", "nuclear age/air travel", "information age", "information age", "machine intelligence era", "quantum era", "interstellar era", "post-apocalyptic", "post-apocalyptic"]);
    }
}

function genlifefromatmosphere(atmosphere) {
    if (atmosphere == "none"){
        return pickRandom(["none", "microscopic"]);
    } else if (atmosphere == "thin") {
        return pickRandom(["none", "microscopic", "simple"]);
    } else if (atmosphere == "toxic"){
        return "none";
    } else {
        return pickRandom(["none", "microscopic", "simple", "complex", "intelligent"]);
    }
}

function generateNumCountriesFromCiv(civtype) {
    if (civtype == "none" || civtype == "primitive" || civtype == "post-apocalyptic") {
        return 0;
    } else {
        return randomRange(1, 12);
    }
}

function planetinfogen() {
    const type = pickRandom(["rocky", "earth-like", "water-world", "desert", "humid (jungle)", "frozen planet", "hellish", "ice giant", "gas giant"]);
    const atmosphere = genatmospherefromtype(type);
    const life = genlifefromatmosphere(atmosphere);
    const civ = gencivfromlife(life);
    const numcountries = generateNumCountriesFromCiv(civ);

    data = {
        "name": namegen(1)[0],
        "type": type,
        "size": pickRandom(["tiny", "small", "medium", "large", "huge"]),
        "atmosphere": atmosphere,
        "temperature": gentempfromtype(type),
        "gravity": pickRandom(["low", "medium", "high"]),
        "life": life,
        "civilization": civ,
        "countrycount": numcountries,
        "countries": gencountries(numcountries, civ),
    } 
    return data;
}

function genplanet() {
    var data = planetinfogen();
    if (data.civilization == "none") {
        var civString = "no civilization";
    } else {
        var civString = "a " + data.civilization + " civilization";
    }
    var convertedLife = data.life;
    if (convertedLife == "none") {
        convertedLife = "no";
    }
    var html = `
    <h1>The planet ${data.name[0].toUpperCase() + data.name.substring(1)}</h1>
    <p>This planet is a ${data.size} ${data.type} planet. It has a ${data.atmosphere} atmosphere, and is ${data.temperature} and has ${data.gravity} gravity. It has ${convertedLife} life, and is home to ${civString}.</p>
    <p>There are ${data.countrycount} countries on this planet:</p>
    `;
    if (data.civilization != "none") {
        html += "<ul style='color: white;font-family: Arial, Helvetica, sans-serif;'>";
        for (var i = 0; i < data.countries.length; i++) {
            html += `<li>The ${data.countries[i].type} of ${data.countries[i].name[0].toUpperCase() + data.countries[i].name.substring(1)}</li>`;
        }
        html += "</ul>";
    }
    writeContent(html);
}

///////////////////////////// Country/Town Generation /////////////////////////////

function gencountryfromciv(civtype) {
    // Generate a country from a civilization type
    var mintowns = 1;
    var maxtowns = 12;

    var numtowns = randomRange(mintowns, maxtowns);

    var towns = gentownsfromciv(numtowns, civtype);

    var population = 0;
    for (var i = 0; i < towns.length; i++) {
        population += towns[i].population;
    }

    var data = {
        "name": namegen(1)[0],
        "type": pickRandom(["empire", "country", "land"]),
        "government": pickRandom(["monarchy", "democracy", "dictatorship", "republic", "federation", "confederation", "empire", "kingdom"]),
        "population": population,
        "economy": pickRandom(["capitalist economy", "free enterprise economy", "private enterprise economy", "free market economy", "mixed economy", "transition economy"]),
        "military": pickRandom(["none", "small", "medium", "large", "very large"]),
        "numtowns": numtowns,
        "towns": towns,
    }

    return data;
}

function gencountries(numcountries, civtype) {
    // Generate a list of countries
    var countries = [];
    for (var i = 0; i < numcountries; i++) {
        countries.push(gencountryfromciv(civtype));
    }
    return countries;
}

function gentownfromciv(civtype) {
    // Generate a town from a civilization type
    var minpop = 1000;
    var maxpop = 100000;
    // To decrease the number of extremely large towns, there's only a 1 in 30 chance of allowing a town to have a population of over 100,000
    if (randomRange(1, 30) == 1) {
        maxpop = 10000000;
    }

    var data = {
        "name": namegen(1)[0],
        "type": pickRandom(["city", "town", "village", "hamlet", "thorp", "suburb", "land", "city-state", "settlement"]),
        "population": randomRange(minpop, maxpop),
        "economy": pickRandom(["thriving", "prosperous", "moderate", "poor", "depressed", "dying"]),
        "mood": pickRandom(["welcoming", "friendly", "neutral", "hostile", "unwelcoming", "hateful"]),
    }

    return data;
}

function gentownsfromciv(num, civtype) {
    var towns = [];
    for (var i = 0; i < num; i++) {
        towns.push(gentownfromciv(civtype));
    }
    return towns;
}