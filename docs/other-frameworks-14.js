// other-frameworks-14.js

module.exports = {

	title: "Intervention Design Process (2019)",

	year: 2019,

	content: `
		The Intervention Design Process (IDP) was invented by [Matt Wallaert](https://mattwallaert.com/) and is explained in his book [_Start at the End: How to Build Products That Create Change_](https://www.amazon.com/gp/product/B07L2HM12P/ref=as_li_tl?ie=UTF8&tag=shopprime3-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B07L2HM12P&linkId=d7dcf93b91bd6de4e98a463c98d32ea3). The book contains far more information than the simplified summary below, so it is necessary to read the book to understand the framework completely.

		Wallaert summarizes the IDP framework in this way:

		> When we want to change behavior, we start with a potential insight - an observation about the distance between our current world and the counterfactual one in which we want to live. We then validate the insight and flesh it out into a behavioral statement, which we use to map the pressures that are creating the current state of the behavior and thus are the levers we push to change it. After we've validated the pressures, we design interventions that modify them, select and do an ethical check of the ones we choose to pilot (and validate), test (and validate), and (if those work), make a scale decision, with continuous monitoring to make sure the interventions continue to contribute to the behavior we want.

		To apply the IDP framework, use the following steps.

		**Step 1. Generate and validate insights.**

		"When we want to change behavior, we start with a potential insight - an observation about the distance between our current world and the counterfactual one in which we want to live."

		Wallaert describes four types of insights:

		- _Quantitative insights_, which are driven by data, either by uncovering patterns in the data, or studying the positive or negative outliers
		- _Qualitative insights_, which come from talking to and observing people in the world, such as via interviews with customers and relevant non-customers
		- _Apocryphal insights_, which are common knowledge within your organization, which may or may not turn out to be true, and which it is therefore important to validate
		- _External insights_, which come from knowledge in the world outside of your organization, such as from academic papers, experts in other industries, professors, or grad students, etc.

		To validate an insight, look for convergence across multiple types of insight (e.g., the quantitative and qualitative conclusions agree with each other).

		**Step 2. Generate a behavioral statement from those insights that describes the world you are trying to create from a behavioral perspective.**

		As Wallaert explains it:

		> [Behavioral statements are] an articulation of the world we are trying to create, written from an explicitly behavioral perspective. This description of the counterfactual world, which we realize exists through our insights and insight validation, lays the foundation for...pressure mapping and eventually intervention design...At its core, a behavioral statement is simply a set of binary conditions that can either be satisfied or not. A typical behavioral statement has five variables that come together into a single sentence:
		>
		> When [population] wants to [motivation], and they [limitations], they will [behavior] (as measured by [data]).
		>
		> - Population = the group of people whose behavior you are trying to change
		> - Motivation = the core motive for why people engage in the behavior
		> - Limitations = the binary preconditions necessary for the behavior to happen that are outside of your control (it is essential that in the limitations you don't include factors that you plan to try to influence)
		> - Behavior = the measurable activity you want people always to do when they have the motivation and limitations above
		> - Data = how you quantify that they are doing the behavior"

		Wallaert gives the example of the Uber car ride service:

		"When [people] want to [get from point A to point B], and they [have a smartphone with connectivity and an electronic form of payment], they will [take an Uber] (as measured by [number of rides])."

		He cautions:

		> Writing a good behavioral statement is [one of the hardest parts] of the IDP...Easily the most common mistake is not being thoughtful enough about the actual behavior you want to change. This often comes because you're focusing on sounding good instead of being good, trying to write a vision statement instead of a behavioral one...[however,] potentially worse than picking the wrong behavior is picking no behavior at all, and that's the second-most-common mistake.

		How can you make your behavioral statement valuable to your organization? Wallaert says:

		> Put it on the wall where everyone can see it...while you should have only one behavioral statement for your organization as a whole, you can scale them endlessly down as needed...Ultimately, the organization's behavioral statement is the thing the CEO is held accountable for: moving (or not moving) that behavior should be the metric by which we reward and punish that single person at the top. But by writing smaller behavioral statements throughout your organization, you can help everyone find the zone within which they have autonomy and thus accountability.

		**Step 3. Map pressures that promote and inhibit the behavior.**

		In this step, you or your organization needs to make a list of the relevant promoting pressures and inhibiting pressures that influence the behavior.

		As Wallaert puts it:

		> We need to map the pressures that create the distance between what we have and what we want, so we know what it is we need to change...when we talk about designing for behavior change, we are actually talking about changing the pressures that determine the behavior, rather than directly changing the behavior itself.

		_Promoting pressures_ make a behavior more likely. For instance, an action being pleasurable, easy, exciting, appealing, close by, etc., encourages people to take the action.

		_Inhibiting pressures_ make a behavior less likely. For instance, an action being confusing, expensive, time-consuming, boring, etc., discourages people from taking the action.

		As Wallaert says:

		> What we actually do is determined by the net product of those forces. If the promoting pressures overcome the inhibiting pressures, we act. If the inhibiting pressures are stronger, we don't...[but] where do all the pressures come from? [In the] IDP we generate them in the same way we generate insights: research and convergent validity.

		**Step 4. Validate the pressures and choose which ones to target.**

		Ideally, you would confirm that the forces you believe are inhibiting pressures actually are reducing the behavior and that the forces you believe are promoting pressures actually are increasing the behavior.

		"Fortunately, all of the interviews and data science you did in search of insights also naturally lend themselves to the mapping and validating of pressures...Like insights, pressures need to be validated."

		Once validated, you'll have an idea of which pressures to target with interventions.

		**Step 5. Design multiple interventions that target the identified pressures.**

		The interventions you design are the specific changes you will make to your product, to your marketing, or to the world that will attempt to alter the relevant pressures.

		Wallaert says:

		> It is entirely possible for a single pressure to give rise to many interventions and equally possible for one intervention to satisfy many pressures. Indeed, that's very much the point of mapping: by formalizing our understanding of pressures, we can more easily see how to combine them and sort them. Intervention design is really just the translation of pressures into something we can actually create; if pressures are the levers, interventions are how we pull them, hopefully in the right order and with the right strength.

		**Step 6. Do an ethics check to make sure the interventions are ethical.**

		According to the framework, a behavior change intervention is unethical if ANY of the following is true:

		- Lack of motivation - your outcome behavior is not the result of any of the motivations of the population. For instance, if your outcome behavior is that your population spends more time on their phone, but your user base wants to spend less time on their phone, this is an ethical problem.
		- Lack of sufficient benefits - the benefit of your outcome behavior (or an intervention to produce it) does not outweigh the cost [it incurs on] an alternative motivation (for the target population). For instance, if your user base does have the motivation to eat tasty food, but the tasty food you give them is very unhealthy, and the health harms (according to the customer) are greater in magnitude than the enjoyment from eating the tasty food, this is an ethical problem.
		- Lack of willingness for transparency - you are unwilling to publicly describe and take responsibility for the outcome behavior or intervention. If you would be embarrassed to publicize the method you are using or the behavioral outcome you are trying to create for your users, this is an ethical problem.

		**Step 7. Select interventions to pilot.**

		The most subjective part of the entire IDP is intervention selection.

		As Wallaert explains:

		> Because ultimately, even with all the insights and pressures and research, you have to make a judgment call about which interventions you're actually going to pilot (because logistically you can't pilot everything)...But you can make smart bets. Because although you can't pilot everything, you also shouldn't pilot only one thing. Intervention selection isn't about driving to a single solution but rather about setting yourself up for a range of pilots that maximize the chance of creating behavior change. Because good behavioral science, like all good science, is based on the assumption that your intervention won't work...In selecting multiple interventions, you're shooting for something psychologists call optimum distinctiveness: a range of options that together cover as much of the spectrum as possible, but with relatively little overlap.
		>
		> ...
		>
		> To reduce your option set, you can do a few things to make it easier. First, combine interventions...Remember, the goal is behavior change, not knowledge - we don't have to know precisely which part of an intervention drives the behavior, so long as the overall intervention is scalable and results in worthwhile behavior change.
		>
		> ...
		>
		> If you've done your job while writing your behavioral statement and defined the right population, then intervention selection is about identifying the cheapest, easiest-to-create, most broadly reaching intervention that still changes the behavior.

		**Step 8. Pilot interventions.**

		Wallaert says:

		> [Pilots are] tightly scoped interventions that we expect not to work...so we use small populations, focus on speed to market, and do them in an operationally dirty way [that has minimum impact on the organization as a whole in the event of failure]...Speed and resource efficiency are also important here. Because we chose multiple interventions during intervention selection, we'll likely be running three to five concurrent pilots at any given time...[a rule of thumb] for project managers is that if it takes longer than two weeks to get into the field, you need to scale it back and go smaller.
		>
		> ...
		>
		> Pilot validation is just like insight validation: qualitative and quantitative confirmation that you're headed in the right direction. Because of the small [sample size], it won't be statistically significant [i.e., you may find p=0.20 instead of p=0.04, and that may be sufficient evidence to proceed to the next step]; you're just trying to get enough of a positive/negative/null signal to make a decision about what comes next...Quantitative researchers will figure out how to actually get that data [to measure the behavior] in a durable way, and qualitative researchers start to understand what questions to ask in their interview script and what environments are the right ones for observation. Done right, the instrumentation we build now will carry us through until we make a scaling decision...We care about changing behavior, not the gnostic pursuit of knowledge...For the interventions typically on the table, there are generally few consequences to being wrong other than wasted resources. So it isn't such a terrible thing to be right [only] four out of five times if the intervention has no significant downsides.
		>
		> ...
		>
		> When an intervention doesn't create the behavior change you want, you've got a decision to make...either you revise the pilot and rerun, or you kill it and return to your pressure map and intervention design.

		**Step 9. Test pilots that show promise.**

		After piloting, those interventions that appear promising will then be tested at a larger size. Those interventions that succeed in testing will then be considered as candidates for scaling.

		Wallaert says:

		> A test is just like a pilot, but with a larger population and greater operational diligence. We're looking hard at the question of 'is it worth it?' In this step, measuring how hard it is going to be to scale against the overall impact it will actually have on behavior. [This] kills more things that you'd think: it turns out to be relatively easy to find interventions that change behavior but relatively hard to find ones that are worth doing. And the way we know is through test validation; again, that constant quantitative and qualitative feedback is key, though our tests also have to stand up to our requirements about operational cost and [intervention] effect size.

		**Step 10. Develop a "juice / squeeze" statement for those interventions that seem promising after testing, and evaluate which interventions are worth scaling given the effort required.**

		As Wallaert explains, piloting and testing culminate in a "juice / squeeze" statement, which summarizes the finding in the following format:

		> We are [confidence] that [intervention] will [direction] [behavior] (as measured by [data]). Scaling this requires [effort] and will result in [change].
		>
		> - Confidence = based on p-value but phrased colloquially
		> - Intervention = what the intervention is
		> - Direction = whether it increases or decreases the behavior
		> - Behavior = the measurable activity you established in your behavior statement
		> - Data = how you quantify that your population is doing the behavior
		> - Effort = the resources required to scale
		> - Change = based on effect size but phrased colloquially

		An example from Wallaert: "We are [very confident] that [sending personalized flu shot letters based on member health motivations] will [increase] [the rate of getting flu shots] (as measured by [flu shot claims]). Scaling this requires [about ten hours and $5,500] and will result in [about 500 additional flu shots]."

		Such a statement will be used to make a decision of whether or not to scale up the intervention.

		**Step 11. Scale the interventions that appear to be worth scaling.**

		Using the juice / squeeze statements, decide which interventions are worth the investment to scale, keeping in mind that most interventions probably won't be worth the effort they would entail.

		**Step 12. Use continuous monitoring to make sure that interventions continue to work.**

		As Wallaert says:

		> Even scaled interventions eventually stop working. And the only way to know when they do, and to modify or eliminate them, is to implement continuous monitoring. It is validation all over again, but in an ongoing way that checks the health not just of one of the interventions, but of our entire behavior-change portfolio.
		>
		> ...
		>
		> Changing pressures may cause you to modify or terminate any number of interventions, and that's just a natural part of the process...[since we document] the entire IDP that produced them, we can work back up the chain to see what has shifted...make sure your continuous monitoring has interruptive alerts. A dashboard is not continuous monitoring, because it requires a human to open said dashboard and monitor for change.

		For more many more details about how to apply this process, read Wallaert's book _Start at the End: How to Build Products That Create Change_.

		**Connection**: The IDP's third step - mapping the pressures that promote and inhibit the behavior - relates to the overall goal of our Ten Conditions framework, which is to understand the sort of factors that affect behavior. In other words, mapping the various pressures that encourage or discourage a behavior involves understanding the conditions under which people engage in the behavior. The IDP's fifth and seventh steps - designing and selecting interventions to target the pressures - occur in our framework as well: after identifying conditions that need improvement, interventions are designed and selected to target those conditions.
	`,

}
