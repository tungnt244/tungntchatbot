/*-----------------------------------------------------------------------------
A simple "Hello World" bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: "c81b7189-2c12-45a2-9b68-24b05a8205ef",
    appPassword: "qwwDNmVqdTUVJ2bwawtABjm"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
//the original route which will reponse to the first request.
bot.dialog('/',[ 
	function (session, args, next) {
	    if(!session.userData.name){
	    	session.beginDialog('/profile');
	    }else{
	    	next();
	    }	
	},
	function (session, results){
		session.send('Hello %s !', session.userData.name);
		session.beginDialog('/picture');
		session.send('Now i will send you a card !!');
		session.beginDialog('/card');
		session.beginDialog('/receipt');
	}
]);
//the profile dialog which will collect the user information
bot.dialog('/profile',[
	function(session){
		builder.Prompts.text(session, "Hi what's your name!");
	},
	function(session, results){
		session.userData.name = results.response;
		session.endDialog();
	}
]);
//the picture route which will send a picture to the user
bot.dialog('/picture', [
	function(session){
		session.send('I am going to send a picture !!');
		var msg = new builder.Message(session)
			.attachments([{
				contentType: 'image/jpeg',
				contentUrl: 'http://www.theoldrobots.com/images62/Bender-18.JPG'
			}]);
		session.endDialog(msg);
	}
]);
//the card route will send send a card (contain a alot of information like image, information, link,...)
bot.dialog('/card',[
	function(session){
		var msg = new builder.Message(session)
			.textFormat(builder.TextFormat.xml)
			.attachments([
				new builder.HeroCard(session)
				.title("Hero Card")
				.subtitle('Space Needle')
				.text('The <b>Space Needle</b> is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.')
				.images([builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")])
				.tap(builder.CardAction.openUrl(session, 'https://en.wikipedia.org/wiki/Space_Needle'))
			]);
		session.endDialog(msg);
	}
]);
//receipt route can have multiple way you can implement.
bot.dialog('/receipt', [
    function (session) {
        session.send("You can send a receipts for facebook using Bot Builders ReceiptCard...");
        var msg = new builder.Message(session)
            .attachments([
                new builder.ReceiptCard(session)
                    .title("Recipient's Name")
                    .items([
                        builder.ReceiptItem.create(session, "$22.00", "EMP Museum").image(builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/a/a0/Night_Exterior_EMP.jpg")),
                        builder.ReceiptItem.create(session, "$22.00", "Space Needle").image(builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/7/7c/Seattlenighttimequeenanne.jpg"))
                    ])
                    .facts([
                        builder.Fact.create(session, "1234567898", "Order Number"),
                        builder.Fact.create(session, "VISA 4076", "Payment Method")
                    ])
                    .tax("$4.40")
                    .total("$48.40")
            ]);
        //session.send(msg);

        // session.send("Or using facebooks native attachment schema...");
        // msg = new builder.Message(session)
        //     .sourceEvent({
        //         facebook: {
        //             attachment: {
        //                 type: "template",
        //                 payload: {
        //                     template_type: "receipt",
        //                     recipient_name: "Stephane Crozatier",
        //                     order_number: "12345678902",
        //                     currency: "USD",
        //                     payment_method: "Visa 2345",        
        //                     order_url: "http://petersapparel.parseapp.com/order?order_id=123456",
        //                     timestamp: "1428444852", 
        //                     elements: [
        //                         {
        //                             title: "Classic White T-Shirt",
        //                             subtitle: "100% Soft and Luxurious Cotton",
        //                             quantity: 2,
        //                             price: 50,
        //                             currency: "USD",
        //                             image_url: "http://petersapparel.parseapp.com/img/whiteshirt.png"
        //                         },
        //                         {
        //                             title: "Classic Gray T-Shirt",
        //                             subtitle: "100% Soft and Luxurious Cotton",
        //                             quantity: 1,
        //                             price: 25,
        //                             currency: "USD",
        //                             image_url: "http://petersapparel.parseapp.com/img/grayshirt.png"
        //                         }
        //                     ],
        //                     address: {
        //                         street_1: "1 Hacker Way",
        //                         street_2: "",
        //                         city: "Menlo Park",
        //                         postal_code: "94025",
        //                         state: "CA",
        //                         country: "US"
        //                     },
        //                     summary: {
        //                         subtotal: 75.00,
        //                         shipping_cost: 4.95,
        //                         total_tax: 6.19,
        //                         total_cost: 56.14
        //                     },
        //                     adjustments: [
        //                         { name: "New Customer Discount", amount: 20 },
        //                         { name: "$10 Off Coupon", amount: 10 }
        //                     ]
        //                 }
        //             }
        //         }
        //     });
        session.endDialog(msg);
    }
]);
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));