/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URLs', function () {
          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
        });

        it('have names', function () {
          allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          });
        });
    });

    describe('The menu', function() {
        it('is hidden by default', function() {
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility on click', function() {
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
      var entries;

      beforeEach(function(done) {
        loadFeed(1, function() {
          entries = $('.feed').children('.entry-link');
          done();
        });
      });

        it('load into the DOM', function() {
          expect(entries.length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {
        var entries;
        var newEntries;

        beforeEach(function(done) {
          loadFeed(1, function() {
            entries = $('.feed').children('.entry-link');
            loadFeed(2, function() {
              newEntries = $('.feed').children('.entry-link');
              done();
            });
          });
        });

        it('loads new feed', function(done) {
          // tests the first two entries, making sure they are not the same entry
          expect(entries[0].innerHTML).not.toBe(newEntries[0].innerHTML);
          done();
        });
    });
}());
