$(document).ready(function(){
// Dinner Page
    $("#search").on("click", function(event) {
    $("#results").empty();
        event.preventDefault();
        // This line grabs the input from the textbox
        var location = $("#zipcode").val().trim();
        var categories =$("#selectType").val().trim();
       
  
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location="+location+"&categories="+categories;
  

         $.ajax({
            url: queryURL ,
            headers: {
             'Authorization':'Bearer VVvVOjZGwwjxwP4wq77qbiUkO8tOtAWv7M6f0WIIkbRNnYzcGYm9jpxdWa9sEHncnFvEIDaU6pl3CftfLcI8sw_6gwZAZfjM9I6kRmMTdKUtszphLRLoOW3oIqrEXnYx',
         },
            method: 'GET',
            dataType: 'json',
            success: function(data){
                console.log('success: '+data);
               // Grab the results from the API JSON return
               var totalresults = data.total;

        
               
               // If our results are greater than 0, continue
               if (totalresults > 0){
                   // Display a header on the page with the number of results
                   $('#results').append('<p>We discovered ' + totalresults + ' results!</p>');
                   // Itirate through the JSON array of 'businesses' which was returned by the API

              
                   $.each(data.businesses, function(i, item) {
                  
                       // Store each business's object in a variable
                       var id = item.id;
                       var alias = item.alias;
                       var phone = item.display_phone;
                       var name = item.name;
                       var rating = item.rating;
                       var reviewcount = item.review_count;
                       var address = item.location.address1;
                       var city = item.location.city;
                       var state = item.location.state;
                       var zipcode = item.location.zip_code;
                       // Append our result into our page
                      
                     $('#results').append(
                        '<tr><td><a href="https://www.yelp.com/biz/' + alias + '" target="new">' + name + '</a></b></td><td>(<b>' + rating + '</b> <i class="fa fa-star"></i> ' + reviewcount + ' reviews)</td><td>' + address + ' ' + city + '  ' + state + ' ' + zipcode + '</td><td>' + phone + '</td></tr>');
                
                    });
               } else {
                   // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                   $('#results').append('<h5 id="discovered">We discovered no results! Please Refresh The Page!! and Enter Again</h5>');
               }
           }
        });             

}); 

}); 



function clear() {
    $("#results").empty();
    $("#discovered").empty();
    inputForm.reset();
    location.reload(true);

  }

//  .on("click") function associated with the clear button
$("#clear-all").on("click", function(){
    clear();
});


//----------------------------------------------------------------//

// Home Page


