module.exports = {
	common: {
		color: 0xfefefe,
		title: "Rappel Trackkarma",
		description: "Pensez à indiquer votre présence ou absence pour ce soir !",
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
			time: "30 10 * * 2",// Mardi
			embed: {}
		},
		{
			channel: "603647986865668106",// #général-missfeet
			time: "30 10 * * 1",// Lundi
			embed: {
				color: 0xbb6bff,
			}
		},
		{
			channel: "603647326397005845",// #général-rcp
			time: "30 10 * * 3",// Mercredi
			embed: {
				color: 0xd40000,
			}
		},
		{
			channel: "603647965382443036",// #général-chica
			time: "30 10 * * 4",// Jeudi
			embed: {
				color: 0x277ecd,
			}
		}
	]
};