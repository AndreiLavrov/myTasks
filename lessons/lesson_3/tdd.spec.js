/**
 * Find when population 'p0' grow to 'p',
 * if you know 'percent' of grow and how much people
 * come to town
 * p0 + p0 * percent + aug
 */

describe('tdd.spec.js -> Should check populationGrow function', function() {
	it('Basic tests', function() {
		expect(populationGrow(1500, 5, 100, 5000)).toBe(15);
		expect(populationGrow(1500000, 2.5, 10000, 2000000)).toBe(10);
		expect(populationGrow(1500000, 0.25, 1000, 2000000)).toBe(94);
	});
});


describe('tdd.spec.js -> tests for isTriangle function', function() {
	it('should return true', function(){
		expect(isTriangle(1, 2, 2)).toBeTruthy();
	});

	it('should return false', function(){
		expect(isTriangle(7, 2, 2)).toBeFalsy();
	});
});

describe('tdd.spec.js ->  should return the length of the shortest word(s) in string', function(){
	it('Basic test', function() {
		expect(findShort('bitcoin take over the world maybe who knows perhaps')).toBe(3);
		expect(findShort('turns out random test cases are easier than writing out basic ones')).toBe(3);
	});
});

describe('tdd.spec.js ->solution: returns the sum of all the multiples of 3 or 5 below the number passed in', function(){
  it('basic tests', function() {
    expect(solution(10)).toBe(23);
  });
});

describe('tdd.spec.js -> It should remove all values from list a, which are present in list b', function() {
  it('Removing from empty array should return []', function() {
    expect(arrayDiff([], [4, 5])).toEqual([]);
  });

  it('Basic test', function() {
    expect(arrayDiff([3, 4], [3])).toEqual([4]);
  });

  it('Removing empty array should return array without diff', function() {
    expect(arrayDiff([1, 8, 2], [])).toEqual([1, 8, 2]);
  });
});
