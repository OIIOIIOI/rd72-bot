module.exports = {
	common: {
		color: 0xfefefe,
		title: "Rappel Trackkarma",
		description: "Pensez à indiquer votre présence ou absence pour demain !",
		fields: [
			{
				name: 'Merci ! <:president:619226378566369291>',
				value: 'https://app.trackkarma.com',
			},
		]
	},
	list: [
		{
			channel: "603647950282817617",// #général-fresh
			time: "30 19 * * 0",// Dimanche
			embed: {}
		},
		{
			channel: "603647950282817617",// #général-fresh
			time: "30 19 * * 5",// Vendredi
			embed: {}
		},
		{
			channel: "603647986865668106",// #général-missfeet
			time: "30 19 * * 0",// Dimanche
			embed: {
				color: 0xbb6bff,
			}
		},
		{
			channel: "603647326397005845",// #général-rcp
			time: "30 19 * * 2",// Mardi
			embed: {
				color: 0xd40000,
			}
		},
		{
			channel: "603647965382443036",// #général-chica
			time: "30 19 * * 3",// Mercredi
			embed: {
				color: 0x277ecd,
			}
		}
	]
};