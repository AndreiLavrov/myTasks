xdescribe('debug.js -> createMultiplyTable -> tests for multiply table', function(){
    var result;

    beforeEach(function(){
       result =  createMultiplyTable();
    });

   it('Should return 10 items in array', function(){
	  expect(result.length).toBe(10);
   });

   it('Items shouldn\'t be undefined', function() {
       for (var i = 0; i < result.length; i++) {
           expect(result[i].indexOf('undefined')).toBe(-1);
       }
   });
});

xdescribe('debug.js -> renderMultiplyTable -> should render table', function() {
    var result;

    beforeEach(function(){
        result =  createMultiplyTable();
    });

    it('Should render table', function() {
        renderMultiplyTable(result);
        expect(document.querySelector('table')).toBeDefined();
    });
});

xdescribe('debug.js -> outputTable -> tests for output', function() {
    var table;

    beforeEach(function() {
       table = ['test', 'test_2'];
    });

    it('Should call createMultiplyTable', function(){
       spyOn(window, 'createMultiplyTable').and.returnValue(table);
       outputTable();
       expect(window.createMultiplyTable).toHaveBeenCalled();
    });

    it('Should call renderMultiplyTable', function() {
       spyOn(window, 'createMultiplyTable').and.returnValue(table);
       spyOn(window, 'renderMultiplyTable');
       outputTable();
       expect(window.renderMultiplyTable).toHaveBeenCalledWith(table);
    });
});