Tinytest.add("Errors collection works", function(test) {
  Errors.collection.remove({});

  test.equal(Errors.collection.find({}).count(), 0);
  
  Errors.throw('A new error!');
  test.equal(Errors.collection.find({}).count(), 1);
  
});

Tinytest.addAsync("Errors template works", function(test, done) {
  Errors.collection.remove({});

  Errors.throw('A new error!');
  test.equal(Errors.collection.find({seen: false}).count(), 1);
  
  UI.render(Template.meteorErrors);
  
  
  Meteor.setTimeout(function() {
    test.equal(Errors.collection.find({seen: false}).count(), 0);
    test.equal(Errors.collection.find({}).count(), 1);
    Errors.clear_seen();
    test.equal(Errors.collection.find({seen: true}).count(), 0);
    done();
  }, 500);
});