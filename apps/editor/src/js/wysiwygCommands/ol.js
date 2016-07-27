/**
 * @fileoverview Implements WysiwygCommand
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var CommandManager = require('../commandManager');

/**
 * OL
 * Add OL to selected wysiwyg editor content
 * @exports OL
 * @augments Command
 * @augments WysiwygCommand
 */
var OL = CommandManager.command('wysiwyg', /** @lends OL */{
    name: 'OL',
    keyMap: ['CTRL+O', 'META+O'],
    /**
     *  커맨드 핸들러
     *  @param {WysiwygEditor} wwe WYsiwygEditor instance
     */
    exec: function(wwe) {
        var sq = wwe.getEditor(),
            range = sq.getSelection();

        sq.focus();

        if (!range.collapsed) {
            return;
        }

        if (sq.hasFormat('LI')) {
            sq.saveUndoState(range);

            wwe.saveSelection(range);
            wwe.getManager('task').unformatTask(range.startContainer);
            sq.replaceParent(range.startContainer, 'ul', 'ol');
            wwe.restoreSavedSelection();
        } else if (!sq.hasFormat('TABLE') && !sq.hasFormat('PRE')) {
            wwe.unwrapBlockTag();
            sq.makeOrderedList();
        }
    }
});

module.exports = OL;
