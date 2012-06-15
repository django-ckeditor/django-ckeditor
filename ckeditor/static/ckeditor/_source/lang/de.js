﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * German language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['de'] =
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
	source			: 'Quellcode',
	newPage			: 'Neue Seite',
	save			: 'Speichern',
	preview			: 'Vorschau',
	cut				: 'Ausschneiden',
	copy			: 'Kopieren',
	paste			: 'Einfügen',
	print			: 'Drucken',
	underline		: 'Unterstrichen',
	bold			: 'Fett',
	italic			: 'Kursiv',
	selectAll		: 'Alles auswählen',
	removeFormat	: 'Formatierungen entfernen',
	strike			: 'Durchgestrichen',
	subscript		: 'Tiefgestellt',
	superscript		: 'Hochgestellt',
	horizontalrule	: 'Horizontale Linie einfügen',
	pagebreak		: 'Seitenumbruch einfügen',
	unlink			: 'Link entfernen',
	undo			: 'Rückgängig',
	redo			: 'Wiederherstellen',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Server durchsuchen',
		url				: 'URL',
		protocol		: 'Protokoll',
		upload			: 'Upload',
		uploadSubmit	: 'Zum Server senden',
		image			: 'Bild',
		flash			: 'Flash',
		form			: 'Formular',
		checkbox		: 'Checkbox',
		radio			: 'Radiobutton',
		textField		: 'Textfeld einzeilig',
		textarea		: 'Textfeld mehrzeilig',
		hiddenField		: 'verstecktes Feld',
		button			: 'Klickbutton',
		select			: 'Auswahlfeld',
		imageButton		: 'Bildbutton',
		notSet			: '<nichts>',
		id				: 'ID',
		name			: 'Name',
		langDir			: 'Schreibrichtung',
		langDirLtr		: 'Links nach Rechts (LTR)',
		langDirRtl		: 'Rechts nach Links (RTL)',
		langCode		: 'Sprachenkürzel',
		longDescr		: 'Langform URL',
		cssClass		: 'Stylesheet Klasse',
		advisoryTitle	: 'Titel Beschreibung',
		cssStyle		: 'Style',
		ok				: 'OK',
		cancel			: 'Abbrechen',
		close			: 'Close', // MISSING
		preview			: 'Preview', // MISSING
		generalTab		: 'Allgemein',
		advancedTab		: 'Erweitert',
		validateNumberFailed : 'Dieser Wert ist keine Nummer.',
		confirmNewPage	: 'Alle nicht gespeicherten Änderungen gehen verlohren. Sind sie sicher die neue Seite zu laden?',
		confirmCancel	: 'Einige Optionen wurden geändert. Wollen Sie den Dialog dennoch schließen?',
		options			: 'Options', // MISSING
		target			: 'Target', // MISSING
		targetNew		: 'New Window (_blank)', // MISSING
		targetTop		: 'Topmost Window (_top)', // MISSING
		targetSelf		: 'Same Window (_self)', // MISSING
		targetParent	: 'Parent Window (_parent)', // MISSING

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nicht verfügbar</span>'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Sonderzeichen einfügen/editieren',
		title		: 'Sonderzeichen auswählen'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Link einfügen/editieren',
		menu		: 'Link editieren',
		title		: 'Link',
		info		: 'Link-Info',
		target		: 'Zielseite',
		upload		: 'Upload',
		advanced	: 'Erweitert',
		type		: 'Link-Typ',
		toUrl		: 'URL', // MISSING
		toAnchor	: 'Anker in dieser Seite',
		toEmail		: 'E-Mail',
		targetFrame		: '<Frame>',
		targetPopup		: '<Pop-up Fenster>',
		targetFrameName	: 'Ziel-Fenster-Name',
		targetPopupName	: 'Pop-up Fenster-Name',
		popupFeatures	: 'Pop-up Fenster-Eigenschaften',
		popupResizable	: 'Größe änderbar',
		popupStatusBar	: 'Statusleiste',
		popupLocationBar: 'Adress-Leiste',
		popupToolbar	: 'Werkzeugleiste',
		popupMenuBar	: 'Menü-Leiste',
		popupFullScreen	: 'Vollbild (IE)',
		popupScrollBars	: 'Rollbalken',
		popupDependent	: 'Abhängig (Netscape)',
		popupWidth		: 'Breite',
		popupLeft		: 'Linke Position',
		popupHeight		: 'Höhe',
		popupTop		: 'Obere Position',
		id				: 'Id',
		langDir			: 'Schreibrichtung',
		langDirLTR		: 'Links nach Rechts (LTR)',
		langDirRTL		: 'Rechts nach Links (RTL)',
		acccessKey		: 'Zugriffstaste',
		name			: 'Name',
		langCode		: 'Schreibrichtung',
		tabIndex		: 'Tab-Index',
		advisoryTitle	: 'Titel Beschreibung',
		advisoryContentType	: 'Inhaltstyp',
		cssClasses		: 'Stylesheet Klasse',
		charset			: 'Ziel-Zeichensatz',
		styles			: 'Style',
		selectAnchor	: 'Anker auswählen',
		anchorName		: 'nach Anker Name',
		anchorId		: 'nach Element Id',
		emailAddress	: 'E-Mail Addresse',
		emailSubject	: 'Betreffzeile',
		emailBody		: 'Nachrichtentext',
		noAnchors		: '(keine Anker im Dokument vorhanden)',
		noUrl			: 'Bitte geben Sie die Link-URL an',
		noEmail			: 'Bitte geben Sie e-Mail Adresse an'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Anker einfügen/editieren',
		menu		: 'Anker-Eigenschaften',
		title		: 'Anker-Eigenschaften',
		name		: 'Anker Name',
		errorName	: 'Bitte geben Sie den Namen des Ankers ein'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Suchen und Ersetzen',
		find				: 'Suchen',
		replace				: 'Ersetzen',
		findWhat			: 'Suche nach:',
		replaceWith			: 'Ersetze mit:',
		notFoundMsg			: 'Der gesuchte Text wurde nicht gefunden.',
		matchCase			: 'Groß-Kleinschreibung beachten',
		matchWord			: 'Nur ganze Worte suchen',
		matchCyclic			: 'zyklische suche',
		replaceAll			: 'Alle Ersetzen',
		replaceSuccessMsg	: '%1 vorkommen ersetzt.'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Tabelle',
		title		: 'Tabellen-Eigenschaften',
		menu		: 'Tabellen-Eigenschaften',
		deleteTable	: 'Tabelle löschen',
		rows		: 'Zeile',
		columns		: 'Spalte',
		border		: 'Rahmen',
		align		: 'Ausrichtung',
		alignLeft	: 'Links',
		alignCenter	: 'Zentriert',
		alignRight	: 'Rechts',
		width		: 'Breite',
		widthPx		: 'Pixel',
		widthPc		: '%',
		widthUnit	: 'width unit', // MISSING
		height		: 'Höhe',
		cellSpace	: 'Zellenabstand außen',
		cellPad		: 'Zellenabstand innen',
		caption		: 'Überschrift',
		summary		: 'Inhaltsübersicht',
		headers		: 'Überschriften',
		headersNone		: 'keine',
		headersColumn	: 'Erste Spalte',
		headersRow		: 'Erste Zeile',
		headersBoth		: 'keine',
		invalidRows		: 'Die Anzahl der Zeilen muß größer als 0 sein.',
		invalidCols		: 'Die Anzahl der Spalten muß größer als 0 sein..',
		invalidBorder	: 'Die Rahmenbreite muß eine Zahl sein.',
		invalidWidth	: 'Die Tabellenbreite muss eine Zahl sein.',
		invalidHeight	: 'Die Tabellenbreite muß eine Zahl sein.',
		invalidCellSpacing	: 'Der Zellenabstand außen muß eine Zahl sein.',
		invalidCellPadding	: 'Der Zellenabstand innen muß eine Zahl sein.',

		cell :
		{
			menu			: 'Zelle',
			insertBefore	: 'Zelle davor einfügen',
			insertAfter		: 'Zelle danach einfügen',
			deleteCell		: 'Zelle löschen',
			merge			: 'Zellen verbinden',
			mergeRight		: 'nach rechts verbinden',
			mergeDown		: 'nach unten verbinden',
			splitHorizontal	: 'Zelle horizontal teilen',
			splitVertical	: 'Zelle vertikal teilen',
			title			: 'Zellen Eigenschaften',
			cellType		: 'Zellart',
			rowSpan			: 'Anzahl Zeilen verbinden',
			colSpan			: 'Anzahl Spalten verbinden',
			wordWrap		: 'Zeilenumbruch',
			hAlign			: 'Horizontale Ausrichtung',
			vAlign			: 'Vertikale Ausrichtung',
			alignTop		: 'Oben',
			alignMiddle		: 'Mitte',
			alignBottom		: 'Unten',
			alignBaseline	: 'Grundlinie',
			bgColor			: 'Hintergrundfarbe',
			borderColor		: 'Rahmenfarbe',
			data			: 'Daten',
			header			: 'Überschrift',
			yes				: 'Ja',
			no				: 'Nein',
			invalidWidth	: 'Zellenbreite muß eine Zahl sein.',
			invalidHeight	: 'Zellenhöhe muß eine Zahl sein.',
			invalidRowSpan	: '"Anzahl Zeilen verbinden" muss eine Ganzzahl sein.',
			invalidColSpan	: '"Anzahl Spalten verbinden" muss eine Ganzzahl sein.',
			chooseColor		: 'Choose' // MISSING
		},

		row :
		{
			menu			: 'Zeile',
			insertBefore	: 'Zeile oberhalb einfügen',
			insertAfter		: 'Zeile unterhalb einfügen',
			deleteRow		: 'Zeile entfernen'
		},

		column :
		{
			menu			: 'Spalte',
			insertBefore	: 'Spalte links davor einfügen',
			insertAfter		: 'Spalte rechts danach einfügen',
			deleteColumn	: 'Spalte löschen'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Button-Eigenschaften',
		text		: 'Text (Wert)',
		type		: 'Typ',
		typeBtn		: 'Button',
		typeSbm		: 'Absenden',
		typeRst		: 'Zurücksetzen'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Checkbox-Eigenschaften',
		radioTitle	: 'Optionsfeld-Eigenschaften',
		value		: 'Wert',
		selected	: 'ausgewählt'
	},

	// Form Dialog.
	form :
	{
		title		: 'Formular-Eigenschaften',
		menu		: 'Formular-Eigenschaften',
		action		: 'Action',
		method		: 'Method',
		encoding	: 'Zeichenkodierung'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Auswahlfeld-Eigenschaften',
		selectInfo	: 'Info',
		opAvail		: 'Mögliche Optionen',
		value		: 'Wert',
		size		: 'Größe',
		lines		: 'Linien',
		chkMulti	: 'Erlaube Mehrfachauswahl',
		opText		: 'Text',
		opValue		: 'Wert',
		btnAdd		: 'Hinzufügen',
		btnModify	: 'Ändern',
		btnUp		: 'Hoch',
		btnDown		: 'Runter',
		btnSetValue : 'Setze als Standardwert',
		btnDelete	: 'Entfernen'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Textfeld (mehrzeilig) Eigenschaften',
		cols		: 'Spalten',
		rows		: 'Reihen'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Textfeld (einzeilig) Eigenschaften',
		name		: 'Name',
		value		: 'Wert',
		charWidth	: 'Zeichenbreite',
		maxChars	: 'Max. Zeichen',
		type		: 'Typ',
		typeText	: 'Text',
		typePass	: 'Passwort'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Verstecktes Feld-Eigenschaften',
		name	: 'Name',
		value	: 'Wert'
	},

	// Image Dialog.
	image :
	{
		title		: 'Bild-Eigenschaften',
		titleButton	: 'Bildbutton-Eigenschaften',
		menu		: 'Bild-Eigenschaften',
		infoTab		: 'Bild-Info',
		btnUpload	: 'Zum Server senden',
		upload		: 'Hochladen',
		alt			: 'Alternativer Text',
		width		: 'Breite',
		height		: 'Höhe',
		lockRatio	: 'Größenverhältnis beibehalten',
		unlockRatio	: 'Unlock Ratio', // MISSING
		resetSize	: 'Größe zurücksetzen',
		border		: 'Rahmen',
		hSpace		: 'Horizontal-Abstand',
		vSpace		: 'Vertikal-Abstand',
		align		: 'Ausrichtung',
		alignLeft	: 'Links',
		alignRight	: 'Rechts',
		alertUrl	: 'Bitte geben Sie die Bild-URL an',
		linkTab		: 'Link',
		button2Img	: 'Möchten Sie den gewählten Bild-Button in ein einfaches Bild umwandeln?',
		img2Button	: 'Möchten Sie das gewählten Bild in einen Bild-Button umwandeln?',
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
		properties		: 'Flash-Eigenschaften',
		propertiesTab	: 'Eigenschaften',
		title			: 'Flash-Eigenschaften',
		chkPlay			: 'autom. Abspielen',
		chkLoop			: 'Endlosschleife',
		chkMenu			: 'Flash-Menü aktivieren',
		chkFull			: 'Vollbildmodus erlauben',
 		scale			: 'Skalierung',
		scaleAll		: 'Alles anzeigen',
		scaleNoBorder	: 'ohne Rand',
		scaleFit		: 'Passgenau',
		access			: 'Skript Zugang',
		accessAlways	: 'Immer',
		accessSameDomain: 'Gleiche Domain',
		accessNever		: 'Nie',
		align			: 'Ausrichtung',
		alignLeft		: 'Links',
		alignAbsBottom	: 'Abs Unten',
		alignAbsMiddle	: 'Abs Mitte',
		alignBaseline	: 'Baseline',
		alignBottom		: 'Unten',
		alignMiddle		: 'Mitte',
		alignRight		: 'Rechts',
		alignTextTop	: 'Text Oben',
		alignTop		: 'Oben',
		quality			: 'Qualität',
		qualityBest		: 'Beste',
		qualityHigh		: 'Hoch',
		qualityAutoHigh	: 'Auto Hoch',
		qualityMedium	: 'Medium',
		qualityAutoLow	: 'Auto Niedrig',
		qualityLow		: 'Niedrig',
		windowModeWindow: 'Fenster',
		windowModeOpaque: 'Deckend',
		windowModeTransparent : 'Transparent',
		windowMode		: 'Fenster Modus',
		flashvars		: 'Variablen für Flash',
		bgcolor			: 'Hintergrundfarbe',
		width			: 'Breite',
		height			: 'Höhe',
		hSpace			: 'Horizontal-Abstand',
		vSpace			: 'Vertikal-Abstand',
		validateSrc		: 'Bitte geben Sie die Link-URL an',
		validateWidth	: 'Breite muss eine Zahl sein.',
		validateHeight	: 'Höhe muss eine Zahl sein.',
		validateHSpace	: 'HSpace muss eine Zahl sein.',
		validateVSpace	: 'VSpace muss eine Zahl sein.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Rechtschreibprüfung',
		title			: 'Rechtschreibprüfung',
		notAvailable	: 'Entschuldigung, aber dieser Dienst steht im Moment nicht zur verfügung.',
		errorLoading	: 'Fehler beim laden des Dienstanbieters: %s.',
		notInDic		: 'Nicht im Wörterbuch',
		changeTo		: 'Ändern in',
		btnIgnore		: 'Ignorieren',
		btnIgnoreAll	: 'Alle Ignorieren',
		btnReplace		: 'Ersetzen',
		btnReplaceAll	: 'Alle Ersetzen',
		btnUndo			: 'Rückgängig',
		noSuggestions	: ' - keine Vorschläge - ',
		progress		: 'Rechtschreibprüfung läuft...',
		noMispell		: 'Rechtschreibprüfung abgeschlossen - keine Fehler gefunden',
		noChanges		: 'Rechtschreibprüfung abgeschlossen - keine Worte geändert',
		oneChange		: 'Rechtschreibprüfung abgeschlossen - ein Wort geändert',
		manyChanges		: 'Rechtschreibprüfung abgeschlossen - %1 Wörter geändert',
		ieSpellDownload	: 'Rechtschreibprüfung nicht installiert. Möchten Sie sie jetzt herunterladen?'
	},

	smiley :
	{
		toolbar	: 'Smiley',
		title	: 'Smiley auswählen'
	},

	elementsPath :
	{
		eleLabel : 'Elements path', // MISSING
		eleTitle : '%1 Element'
	},

	numberedlist	: 'Nummerierte Liste',
	bulletedlist	: 'Liste',
	indent			: 'Einzug erhöhen',
	outdent			: 'Einzug verringern',

	justify :
	{
		left	: 'Linksbündig',
		center	: 'Zentriert',
		right	: 'Rechtsbündig',
		block	: 'Blocksatz'
	},

	blockquote : 'Zitatblock',

	clipboard :
	{
		title		: 'Einfügen',
		cutError	: 'Die Sicherheitseinstellungen Ihres Browsers lassen es nicht zu, den Text automatisch auszuschneiden. Bitte benutzen Sie die System-Zwischenablage über STRG-X (ausschneiden) und STRG-V (einfügen).',
		copyError	: 'Die Sicherheitseinstellungen Ihres Browsers lassen es nicht zu, den Text automatisch kopieren. Bitte benutzen Sie die System-Zwischenablage über STRG-C (kopieren).',
		pasteMsg	: 'Bitte fügen Sie den Text in der folgenden Box über die Tastatur (mit <STRONG>Strg+V</STRONG>) ein und bestätigen Sie mit <STRONG>OK</STRONG>.',
		securityMsg	: 'Aufgrund von Sicherheitsbeschränkungen Ihres Browsers kann der Editor nicht direkt auf die Zwischenablage zugreifen. Bitte fügen Sie den Inhalt erneut in diesem Fenster ein.',
		pasteArea	: 'Paste Area' // MISSING
	},

	pastefromword :
	{
		confirmCleanup	: 'Der Text, den Sie einfügen möchten, scheint aus MS-Word kopiert zu sein. Möchten Sie ihn zuvor bereinigen lassen?',
		toolbar			: 'aus MS-Word einfügen',
		title			: 'aus MS-Word einfügen',
		error			: 'It was not possible to clean up the pasted data due to an internal error' // MISSING
	},

	pasteText :
	{
		button	: 'Als Text einfügen',
		title	: 'Als Text einfügen'
	},

	templates :
	{
		button			: 'Vorlagen',
		title			: 'Vorlagen',
		insertOption	: 'Aktuellen Inhalt ersetzen',
		selectPromptMsg	: 'Klicken Sie auf eine Vorlage, um sie im Editor zu öffnen (der aktuelle Inhalt wird dabei gelöscht!):',
		emptyListMsg	: '(keine Vorlagen definiert)'
	},

	showBlocks : 'Blöcke anzeigen',

	stylesCombo :
	{
		label		: 'Stil',
		panelTitle	: 'Formatting Styles', // MISSING
		panelTitle1	: 'Block Stilart',
		panelTitle2	: 'Inline Stilart',
		panelTitle3	: 'Objekt Stilart'
	},

	format :
	{
		label		: 'Format',
		panelTitle	: 'Format',

		tag_p		: 'Normal',
		tag_pre		: 'Formatiert',
		tag_address	: 'Addresse',
		tag_h1		: 'Überschrift 1',
		tag_h2		: 'Überschrift 2',
		tag_h3		: 'Überschrift 3',
		tag_h4		: 'Überschrift 4',
		tag_h5		: 'Überschrift 5',
		tag_h6		: 'Überschrift 6',
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
		label		: 'Schriftart',
		voiceLabel	: 'Schriftart',
		panelTitle	: 'Schriftart'
	},

	fontSize :
	{
		label		: 'Größe',
		voiceLabel	: 'Schrifgröße',
		panelTitle	: 'Größe'
	},

	colorButton :
	{
		textColorTitle	: 'Textfarbe',
		bgColorTitle	: 'Hintergrundfarbe',
		panelTitle		: 'Colors', // MISSING
		auto			: 'Automatisch',
		more			: 'Weitere Farben...'
	},

	colors :
	{
		'000' : 'Schwarz',
		'800000' : 'Kastanienbraun',
		'8B4513' : 'Braun',
		'2F4F4F' : 'Dunkles Schiefergrau',
		'008080' : 'Blaugrün',
		'000080' : 'Navy',
		'4B0082' : 'Indigo',
		'696969' : 'Dunkelgrau',
		'B22222' : 'Ziegelrot',
		'A52A2A' : 'Braun',
		'DAA520' : 'Goldgelb',
		'006400' : 'Dunkelgrün',
		'40E0D0' : 'Türkis',
		'0000CD' : 'Medium Blau',
		'800080' : 'Lila',
		'808080' : 'Grau',
		'F00' : 'Rot',
		'FF8C00' : 'Dunkelorange',
		'FFD700' : 'Gold',
		'008000' : 'Grün',
		'0FF' : 'Cyan',
		'00F' : 'Blau',
		'EE82EE' : 'Hellviolett',
		'A9A9A9' : 'Dunkelgrau',
		'FFA07A' : 'Helles Lachsrosa',
		'FFA500' : 'Orange',
		'FFFF00' : 'Gelb',
		'00FF00' : 'Lime',
		'AFEEEE' : 'Blaß-Türkis',
		'ADD8E6' : 'Hellblau',
		'DDA0DD' : 'Pflaumenblau',
		'D3D3D3' : 'Hellgrau',
		'FFF0F5' : 'Lavendel',
		'FAEBD7' : 'Antik Weiß',
		'FFFFE0' : 'Hellgelb',
		'F0FFF0' : 'Honigtau',
		'F0FFFF' : 'Azurblau',
		'F0F8FF' : 'Alice Blau',
		'E6E6FA' : 'Lavendel',
		'FFF' : 'Weiß'
	},

	scayt :
	{
		title			: 'Rechtschreibprüfung während der Texteingabe',
		enable			: 'SCAYT einschalten',
		disable			: 'SCAYT ausschalten',
		about			: 'Über SCAYT',
		toggle			: 'SCAYT umschalten',
		options			: 'Optionen',
		langs			: 'Sprachen',
		moreSuggestions	: 'Mehr Vorschläge',
		ignore			: 'Ignorieren',
		ignoreAll		: 'Alle ignorieren',
		addWord			: 'Wort hinzufügen',
		emptyDic		: 'Wörterbuchname sollte leer sein.',
		optionsTab		: 'Optionen',
		languagesTab	: 'Sprachen',
		dictionariesTab	: 'Wörterbücher',
		aboutTab		: 'Über'
	},

	about :
	{
		title		: 'Über CKEditor',
		dlgTitle	: 'Über CKEditor',
		moreInfo	: 'Für Informationen Liztenzbestimmungen besuchen sie bitte unsere Webseite:',
		copy		: 'Copyright &copy; $1. Alle Rechte vorbehalten.'
	},

	maximize : 'Maximieren',
	minimize : 'Minimize', // MISSING

	fakeobjects :
	{
		anchor	: 'Anker',
		flash	: 'Flash Animation',
		div		: 'Seitenumbruch',
		unknown	: 'Unbekanntes Objekt'
	},

	resize : 'Zum Vergrößern ziehen',

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
