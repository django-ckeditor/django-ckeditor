﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Croatian language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['hr'] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default 'ltr'
	 */
	dir : 'ltr',

	/*
	 * Screenreader titles. Please note that screenreaders are not always capable
	 * of reading non-English words. So be careful while translating it.
	 */
	editorTitle : 'Rich text editor, %1, press ALT 0 for help.', // MISSING

	// ARIA descriptions.
	toolbar	: 'Toolbar', // MISSING
	editor	: 'Rich Text Editor', // MISSING

	// Toolbar buttons without dialogs.
	source			: 'Kôd',
	newPage			: 'Nova stranica',
	save			: 'Snimi',
	preview			: 'Pregledaj',
	cut				: 'Izreži',
	copy			: 'Kopiraj',
	paste			: 'Zalijepi',
	print			: 'Ispiši',
	underline		: 'Potcrtano',
	bold			: 'Podebljaj',
	italic			: 'Ukosi',
	selectAll		: 'Odaberi sve',
	removeFormat	: 'Ukloni formatiranje',
	strike			: 'Precrtano',
	subscript		: 'Subscript',
	superscript		: 'Superscript',
	horizontalrule	: 'Ubaci vodoravnu liniju',
	pagebreak		: 'Ubaci prijelom stranice',
	unlink			: 'Ukloni link',
	undo			: 'Poništi',
	redo			: 'Ponovi',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Pretraži server',
		url				: 'URL',
		protocol		: 'Protokol',
		upload			: 'Pošalji',
		uploadSubmit	: 'Pošalji na server',
		image			: 'Slika',
		flash			: 'Flash',
		form			: 'Form',
		checkbox		: 'Checkbox',
		radio			: 'Radio Button',
		textField		: 'Text Field',
		textarea		: 'Textarea',
		hiddenField		: 'Hidden Field',
		button			: 'Button',
		select			: 'Selection Field',
		imageButton		: 'Image Button',
		notSet			: '<nije postavljeno>',
		id				: 'Id',
		name			: 'Naziv',
		langDir			: 'Smjer jezika',
		langDirLtr		: 'S lijeva na desno (LTR)',
		langDirRtl		: 'S desna na lijevo (RTL)',
		langCode		: 'Kôd jezika',
		longDescr		: 'Dugački opis URL',
		cssClass		: 'Stylesheet klase',
		advisoryTitle	: 'Advisory naslov',
		cssStyle		: 'Stil',
		ok				: 'OK',
		cancel			: 'Poništi',
		close			: 'Close', // MISSING
		preview			: 'Preview', // MISSING
		generalTab		: 'Općenito',
		advancedTab		: 'Napredno',
		validateNumberFailed : 'Ova vrijednost nije broj.',
		confirmNewPage	: 'Sve napravljene promjene će biti izgubljene ukoliko ih niste snimili. Sigurno želite učitati novu stranicu?',
		confirmCancel	: 'Neke od opcija su promjenjene. Sigurno želite zatvoriti ovaj prozor?',
		options			: 'Options', // MISSING
		target			: 'Target', // MISSING
		targetNew		: 'New Window (_blank)', // MISSING
		targetTop		: 'Topmost Window (_top)', // MISSING
		targetSelf		: 'Same Window (_self)', // MISSING
		targetParent	: 'Parent Window (_parent)', // MISSING

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nedostupno</span>'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Ubaci posebne znakove',
		title		: 'Odaberite posebni karakter'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Ubaci/promijeni link',
		menu		: 'Promijeni link',
		title		: 'Link',
		info		: 'Link Info',
		target		: 'Meta',
		upload		: 'Pošalji',
		advanced	: 'Napredno',
		type		: 'Link vrsta',
		toUrl		: 'URL', // MISSING
		toAnchor	: 'Sidro na ovoj stranici',
		toEmail		: 'E-Mail',
		targetFrame		: '<okvir>',
		targetPopup		: '<popup prozor>',
		targetFrameName	: 'Ime ciljnog okvira',
		targetPopupName	: 'Naziv popup prozora',
		popupFeatures	: 'Mogućnosti popup prozora',
		popupResizable	: 'Promjenjiva veličina',
		popupStatusBar	: 'Statusna traka',
		popupLocationBar: 'Traka za lokaciju',
		popupToolbar	: 'Traka s alatima',
		popupMenuBar	: 'Izborna traka',
		popupFullScreen	: 'Cijeli ekran (IE)',
		popupScrollBars	: 'Scroll traka',
		popupDependent	: 'Ovisno (Netscape)',
		popupWidth		: 'Širina',
		popupLeft		: 'Lijeva pozicija',
		popupHeight		: 'Visina',
		popupTop		: 'Gornja pozicija',
		id				: 'Id',
		langDir			: 'Smjer jezika',
		langDirLTR		: 'S lijeva na desno (LTR)',
		langDirRTL		: 'S desna na lijevo (RTL)',
		acccessKey		: 'Pristupna tipka',
		name			: 'Naziv',
		langCode		: 'Smjer jezika',
		tabIndex		: 'Tab Indeks',
		advisoryTitle	: 'Advisory naslov',
		advisoryContentType	: 'Advisory vrsta sadržaja',
		cssClasses		: 'Stylesheet klase',
		charset			: 'Kodna stranica povezanih resursa',
		styles			: 'Stil',
		selectAnchor	: 'Odaberi sidro',
		anchorName		: 'Po nazivu sidra',
		anchorId		: 'Po Id elementa',
		emailAddress	: 'E-Mail adresa',
		emailSubject	: 'Naslov',
		emailBody		: 'Sadržaj poruke',
		noAnchors		: '(Nema dostupnih sidra)',
		noUrl			: 'Molimo upišite URL link',
		noEmail			: 'Molimo upišite e-mail adresu'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Ubaci/promijeni sidro',
		menu		: 'Svojstva sidra',
		title		: 'Svojstva sidra',
		name		: 'Ime sidra',
		errorName	: 'Molimo unesite ime sidra'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Pronađi i zamijeni',
		find				: 'Pronađi',
		replace				: 'Zamijeni',
		findWhat			: 'Pronađi:',
		replaceWith			: 'Zamijeni s:',
		notFoundMsg			: 'Traženi tekst nije pronađen.',
		matchCase			: 'Usporedi mala/velika slova',
		matchWord			: 'Usporedi cijele riječi',
		matchCyclic			: 'Usporedi kružno',
		replaceAll			: 'Zamijeni sve',
		replaceSuccessMsg	: 'Zamijenjeno %1 pojmova.'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Tablica',
		title		: 'Svojstva tablice',
		menu		: 'Svojstva tablice',
		deleteTable	: 'Izbriši tablicu',
		rows		: 'Redova',
		columns		: 'Kolona',
		border		: 'Veličina okvira',
		align		: 'Poravnanje',
		alignLeft	: 'Lijevo',
		alignCenter	: 'Središnje',
		alignRight	: 'Desno',
		width		: 'Širina',
		widthPx		: 'piksela',
		widthPc		: 'postotaka',
		widthUnit	: 'width unit', // MISSING
		height		: 'Visina',
		cellSpace	: 'Prostornost ćelija',
		cellPad		: 'Razmak ćelija',
		caption		: 'Naslov',
		summary		: 'Sažetak',
		headers		: 'Zaglavlje',
		headersNone		: 'Ništa',
		headersColumn	: 'Prva kolona',
		headersRow		: 'Prvi red',
		headersBoth		: 'Oba',
		invalidRows		: 'Broj redova mora biti broj veći od 0.',
		invalidCols		: 'Broj kolona mora biti broj veći od 0.',
		invalidBorder	: 'Debljina ruba mora biti broj.',
		invalidWidth	: 'Širina tablice mora biti broj.',
		invalidHeight	: 'Visina tablice mora biti broj.',
		invalidCellSpacing	: 'Prostornost ćelija mora biti broj.',
		invalidCellPadding	: 'Razmak ćelija mora biti broj.',

		cell :
		{
			menu			: 'Ćelija',
			insertBefore	: 'Ubaci ćeliju prije',
			insertAfter		: 'Ubaci ćeliju poslije',
			deleteCell		: 'Izbriši ćelije',
			merge			: 'Spoji ćelije',
			mergeRight		: 'Spoji desno',
			mergeDown		: 'Spoji dolje',
			splitHorizontal	: 'Podijeli ćeliju vodoravno',
			splitVertical	: 'Podijeli ćeliju okomito',
			title			: 'Svojstva ćelije',
			cellType		: 'Vrsta ćelije',
			rowSpan			: 'Rows Span',
			colSpan			: 'Columns Span',
			wordWrap		: 'Prelazak u novi red',
			hAlign			: 'Vodoravno poravnanje',
			vAlign			: 'Okomito poravnanje',
			alignTop		: 'Vrh',
			alignMiddle		: 'Sredina',
			alignBottom		: 'Dolje',
			alignBaseline	: 'Osnovna linija',
			bgColor			: 'Boja pozadine',
			borderColor		: 'Boja ruba',
			data			: 'Podatak',
			header			: 'Zaglavlje',
			yes				: 'Da',
			no				: 'ne',
			invalidWidth	: 'Širina ćelije mora biti broj.',
			invalidHeight	: 'Visina ćelije mora biti broj.',
			invalidRowSpan	: 'Rows span mora biti cijeli broj.',
			invalidColSpan	: 'Columns span mora biti cijeli broj.',
			chooseColor		: 'Choose' // MISSING
		},

		row :
		{
			menu			: 'Red',
			insertBefore	: 'Ubaci red prije',
			insertAfter		: 'Ubaci red poslije',
			deleteRow		: 'Izbriši redove'
		},

		column :
		{
			menu			: 'Kolona',
			insertBefore	: 'Ubaci kolonu prije',
			insertAfter		: 'Ubaci kolonu poslije',
			deleteColumn	: 'Izbriši kolone'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Image Button svojstva',
		text		: 'Tekst (vrijednost)',
		type		: 'Vrsta',
		typeBtn		: 'Gumb',
		typeSbm		: 'Pošalji',
		typeRst		: 'Poništi'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Checkbox svojstva',
		radioTitle	: 'Radio Button svojstva',
		value		: 'Vrijednost',
		selected	: 'Odabrano'
	},

	// Form Dialog.
	form :
	{
		title		: 'Form svojstva',
		menu		: 'Form svojstva',
		action		: 'Akcija',
		method		: 'Metoda',
		encoding	: 'Encoding'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Selection svojstva',
		selectInfo	: 'Info',
		opAvail		: 'Dostupne opcije',
		value		: 'Vrijednost',
		size		: 'Veličina',
		lines		: 'linija',
		chkMulti	: 'Dozvoli višestruki odabir',
		opText		: 'Tekst',
		opValue		: 'Vrijednost',
		btnAdd		: 'Dodaj',
		btnModify	: 'Promijeni',
		btnUp		: 'Gore',
		btnDown		: 'Dolje',
		btnSetValue : 'Postavi kao odabranu vrijednost',
		btnDelete	: 'Obriši'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Textarea svojstva',
		cols		: 'Kolona',
		rows		: 'Redova'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Text Field svojstva',
		name		: 'Ime',
		value		: 'Vrijednost',
		charWidth	: 'Širina',
		maxChars	: 'Najviše karaktera',
		type		: 'Vrsta',
		typeText	: 'Tekst',
		typePass	: 'Šifra'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Hidden Field svojstva',
		name	: 'Ime',
		value	: 'Vrijednost'
	},

	// Image Dialog.
	image :
	{
		title		: 'Svojstva slika',
		titleButton	: 'Image Button svojstva',
		menu		: 'Svojstva slika',
		infoTab		: 'Info slike',
		btnUpload	: 'Pošalji na server',
		upload		: 'Pošalji',
		alt			: 'Alternativni tekst',
		width		: 'Širina',
		height		: 'Visina',
		lockRatio	: 'Zaključaj odnos',
		unlockRatio	: 'Unlock Ratio', // MISSING
		resetSize	: 'Obriši veličinu',
		border		: 'Okvir',
		hSpace		: 'HSpace',
		vSpace		: 'VSpace',
		align		: 'Poravnaj',
		alignLeft	: 'Lijevo',
		alignRight	: 'Desno',
		alertUrl	: 'Unesite URL slike',
		linkTab		: 'Link',
		button2Img	: 'Želite li promijeniti odabrani gumb u jednostavnu sliku?',
		img2Button	: 'Želite li promijeniti odabranu sliku u gumb?',
		urlMissing	: 'Image source URL is missing.', // MISSING
		validateWidth	: 'Width must be a whole number.', // MISSING
		validateHeight	: 'Height must be a whole number.', // MISSING
		validateBorder	: 'Border must be a whole number.', // MISSING
		validateHSpace	: 'HSpace must be a whole number.', // MISSING
		validateVSpace	: 'VSpace must be a whole number.' // MISSING
	},

	// Flash Dialog
	flash :
	{
		properties		: 'Flash svojstva',
		propertiesTab	: 'Svojstva',
		title			: 'Flash svojstva',
		chkPlay			: 'Auto Play',
		chkLoop			: 'Ponavljaj',
		chkMenu			: 'Omogući Flash izbornik',
		chkFull			: 'Omogući Fullscreen',
 		scale			: 'Omjer',
		scaleAll		: 'Prikaži sve',
		scaleNoBorder	: 'Bez okvira',
		scaleFit		: 'Točna veličina',
		access			: 'Script Access',
		accessAlways	: 'Uvijek',
		accessSameDomain: 'Ista domena',
		accessNever		: 'Nikad',
		align			: 'Poravnaj',
		alignLeft		: 'Lijevo',
		alignAbsBottom	: 'Abs dolje',
		alignAbsMiddle	: 'Abs sredina',
		alignBaseline	: 'Bazno',
		alignBottom		: 'Dolje',
		alignMiddle		: 'Sredina',
		alignRight		: 'Desno',
		alignTextTop	: 'Vrh teksta',
		alignTop		: 'Vrh',
		quality			: 'Kvaliteta',
		qualityBest		: 'Best',
		qualityHigh		: 'High',
		qualityAutoHigh	: 'Auto High',
		qualityMedium	: 'Medium',
		qualityAutoLow	: 'Auto Low',
		qualityLow		: 'Low',
		windowModeWindow: 'Window',
		windowModeOpaque: 'Opaque',
		windowModeTransparent : 'Transparent',
		windowMode		: 'Vrsta prozora',
		flashvars		: 'Varijable za Flash',
		bgcolor			: 'Boja pozadine',
		width			: 'Širina',
		height			: 'Visina',
		hSpace			: 'HSpace',
		vSpace			: 'VSpace',
		validateSrc		: 'Molimo upišite URL link',
		validateWidth	: 'Širina mora biti broj.',
		validateHeight	: 'Visina mora biti broj.',
		validateHSpace	: 'HSpace mora biti broj.',
		validateVSpace	: 'VSpace mora biti broj.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Provjeri pravopis',
		title			: 'Provjera pravopisa',
		notAvailable	: 'Žao nam je, ali usluga trenutno nije dostupna.',
		errorLoading	: 'Greška učitavanja aplikacije: %s.',
		notInDic		: 'Nije u rječniku',
		changeTo		: 'Promijeni u',
		btnIgnore		: 'Zanemari',
		btnIgnoreAll	: 'Zanemari sve',
		btnReplace		: 'Zamijeni',
		btnReplaceAll	: 'Zamijeni sve',
		btnUndo			: 'Vrati',
		noSuggestions	: '-Nema preporuke-',
		progress		: 'Provjera u tijeku...',
		noMispell		: 'Provjera završena: Nema grešaka',
		noChanges		: 'Provjera završena: Nije napravljena promjena',
		oneChange		: 'Provjera završena: Jedna riječ promjenjena',
		manyChanges		: 'Provjera završena: Promijenjeno %1 riječi',
		ieSpellDownload	: 'Provjera pravopisa nije instalirana. Želite li skinuti provjeru pravopisa?'
	},

	smiley :
	{
		toolbar	: 'Smješko',
		title	: 'Ubaci smješka'
	},

	elementsPath :
	{
		eleLabel : 'Elements path', // MISSING
		eleTitle : '%1 element'
	},

	numberedlist	: 'Brojčana lista',
	bulletedlist	: 'Obična lista',
	indent			: 'Pomakni udesno',
	outdent			: 'Pomakni ulijevo',

	justify :
	{
		left	: 'Lijevo poravnanje',
		center	: 'Središnje poravnanje',
		right	: 'Desno poravnanje',
		block	: 'Blok poravnanje'
	},

	blockquote : 'Blockquote',

	clipboard :
	{
		title		: 'Zalijepi',
		cutError	: 'Sigurnosne postavke Vašeg pretraživača ne dozvoljavaju operacije automatskog izrezivanja. Molimo koristite kraticu na tipkovnici (Ctrl+X).',
		copyError	: 'Sigurnosne postavke Vašeg pretraživača ne dozvoljavaju operacije automatskog kopiranja. Molimo koristite kraticu na tipkovnici (Ctrl+C).',
		pasteMsg	: 'Molimo zaljepite unutar doljnjeg okvira koristeći tipkovnicu (<STRONG>Ctrl+V</STRONG>) i kliknite <STRONG>OK</STRONG>.',
		securityMsg	: 'Zbog sigurnosnih postavki Vašeg pretraživača, editor nema direktan pristup Vašem međuspremniku. Potrebno je ponovno zalijepiti tekst u ovaj prozor.',
		pasteArea	: 'Paste Area' // MISSING
	},

	pastefromword :
	{
		confirmCleanup	: 'Tekst koji želite zalijepiti čini se da je kopiran iz Worda. Želite li prije očistiti tekst?',
		toolbar			: 'Zalijepi iz Worda',
		title			: 'Zalijepi iz Worda',
		error			: 'It was not possible to clean up the pasted data due to an internal error' // MISSING
	},

	pasteText :
	{
		button	: 'Zalijepi kao čisti tekst',
		title	: 'Zalijepi kao čisti tekst'
	},

	templates :
	{
		button			: 'Predlošci',
		title			: 'Predlošci sadržaja',
		insertOption	: 'Zamijeni trenutne sadržaje',
		selectPromptMsg	: 'Molimo odaberite predložak koji želite otvoriti<br>(stvarni sadržaj će biti izgubljen):',
		emptyListMsg	: '(Nema definiranih predložaka)'
	},

	showBlocks : 'Prikaži blokove',

	stylesCombo :
	{
		label		: 'Stil',
		panelTitle	: 'Formatting Styles', // MISSING
		panelTitle1	: 'Block stilovi',
		panelTitle2	: 'Inline stilovi',
		panelTitle3	: 'Object stilovi'
	},

	format :
	{
		label		: 'Format',
		panelTitle	: 'Format',

		tag_p		: 'Normal',
		tag_pre		: 'Formatirano',
		tag_address	: 'Address',
		tag_h1		: 'Heading 1',
		tag_h2		: 'Heading 2',
		tag_h3		: 'Heading 3',
		tag_h4		: 'Heading 4',
		tag_h5		: 'Heading 5',
		tag_h6		: 'Heading 6',
		tag_div		: 'Normal (DIV)'
	},

	div :
	{
		title				: 'Create Div Container', // MISSING
		toolbar				: 'Create Div Container', // MISSING
		cssClassInputLabel	: 'Stylesheet Classes', // MISSING
		styleSelectLabel	: 'Style', // MISSING
		IdInputLabel		: 'Id', // MISSING
		languageCodeInputLabel	: ' Language Code', // MISSING
		inlineStyleInputLabel	: 'Inline Style', // MISSING
		advisoryTitleInputLabel	: 'Advisory Title', // MISSING
		langDirLabel		: 'Language Direction', // MISSING
		langDirLTRLabel		: 'Left to Right (LTR)', // MISSING
		langDirRTLLabel		: 'Right to Left (RTL)', // MISSING
		edit				: 'Edit Div', // MISSING
		remove				: 'Remove Div' // MISSING
  	},

	font :
	{
		label		: 'Font',
		voiceLabel	: 'Font',
		panelTitle	: 'Font'
	},

	fontSize :
	{
		label		: 'Veličina',
		voiceLabel	: 'Veličina slova',
		panelTitle	: 'Veličina'
	},

	colorButton :
	{
		textColorTitle	: 'Boja teksta',
		bgColorTitle	: 'Boja pozadine',
		panelTitle		: 'Colors', // MISSING
		auto			: 'Automatski',
		more			: 'Više boja...'
	},

	colors :
	{
		'000' : 'Black', // MISSING
		'800000' : 'Maroon', // MISSING
		'8B4513' : 'Saddle Brown', // MISSING
		'2F4F4F' : 'Dark Slate Gray', // MISSING
		'008080' : 'Teal', // MISSING
		'000080' : 'Navy', // MISSING
		'4B0082' : 'Indigo', // MISSING
		'696969' : 'Dim Gray', // MISSING
		'B22222' : 'Fire Brick', // MISSING
		'A52A2A' : 'Brown', // MISSING
		'DAA520' : 'Golden Rod', // MISSING
		'006400' : 'Dark Green', // MISSING
		'40E0D0' : 'Turquoise', // MISSING
		'0000CD' : 'Medium Blue', // MISSING
		'800080' : 'Purple', // MISSING
		'808080' : 'Gray', // MISSING
		'F00' : 'Red', // MISSING
		'FF8C00' : 'Dark Orange', // MISSING
		'FFD700' : 'Gold', // MISSING
		'008000' : 'Green', // MISSING
		'0FF' : 'Cyan', // MISSING
		'00F' : 'Blue', // MISSING
		'EE82EE' : 'Violet', // MISSING
		'A9A9A9' : 'Dark Gray', // MISSING
		'FFA07A' : 'Light Salmon', // MISSING
		'FFA500' : 'Orange', // MISSING
		'FFFF00' : 'Yellow', // MISSING
		'00FF00' : 'Lime', // MISSING
		'AFEEEE' : 'Pale Turquoise', // MISSING
		'ADD8E6' : 'Light Blue', // MISSING
		'DDA0DD' : 'Plum', // MISSING
		'D3D3D3' : 'Light Grey', // MISSING
		'FFF0F5' : 'Lavender Blush', // MISSING
		'FAEBD7' : 'Antique White', // MISSING
		'FFFFE0' : 'Light Yellow', // MISSING
		'F0FFF0' : 'Honeydew', // MISSING
		'F0FFFF' : 'Azure', // MISSING
		'F0F8FF' : 'Alice Blue', // MISSING
		'E6E6FA' : 'Lavender', // MISSING
		'FFF' : 'White' // MISSING
	},

	scayt :
	{
		title			: 'Provjeri pravopis tijekom tipkanja (SCAYT)',
		enable			: 'Omogući SCAYT',
		disable			: 'Onemogući SCAYT',
		about			: 'O SCAYT',
		toggle			: 'Omoguću/Onemogući SCAYT',
		options			: 'Opcije',
		langs			: 'Jezici',
		moreSuggestions	: 'Više prijedloga',
		ignore			: 'Zanemari',
		ignoreAll		: 'Zanemari sve',
		addWord			: 'Dodaj riječ',
		emptyDic		: 'Naziv rječnika ne smije biti prazno.',
		optionsTab		: 'Opcije',
		languagesTab	: 'Jezici',
		dictionariesTab	: 'Rječnici',
		aboutTab		: 'O SCAYT'
	},

	about :
	{
		title		: 'O CKEditoru',
		dlgTitle	: 'O CKEditoru',
		moreInfo	: 'Za informacije o licencama posjetite našu web stranicu:',
		copy		: 'Copyright &copy; $1. All rights reserved.'
	},

	maximize : 'Povećaj',
	minimize : 'Minimize', // MISSING

	fakeobjects :
	{
		anchor	: 'Sidro',
		flash	: 'Flash animacija',
		div		: 'Prijelom stranice',
		unknown	: 'Nepoznati objekt'
	},

	resize : 'Povuci za promjenu veličine',

	colordialog :
	{
		title		: 'Select color', // MISSING
		highlight	: 'Highlight', // MISSING
		selected	: 'Selected', // MISSING
		clear		: 'Clear' // MISSING
	},

	toolbarCollapse	: 'Collapse Toolbar', // MISSING
	toolbarExpand	: 'Expand Toolbar' // MISSING
};
