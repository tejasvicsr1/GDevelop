// @flow
import * as React from 'react';
import { t } from '@lingui/macro';
import { enumerateObjects } from './EnumerateObjects';
import { useCommandWithOptions } from '../CommandPalette/CommandHooks';
import { type CommandOption } from '../CommandPalette/CommandManager';
import ObjectsRenderingService from '../ObjectsRendering/ObjectsRenderingService';

const editObjectCommandText = t`Edit object...`;
const editObjectVariablesCommandText = t`Edit object variables...`;

const generateLayoutObjectsOptions = (
  project: gdProject,
  layout: gdLayout,
  onChoose: (object: gdObject) => void
): Array<CommandOption> => {
  return enumerateObjects(project, layout).containerObjectsList.map(item => ({
    text: item.object.getName(),
    handler: () => onChoose(item.object),
    iconSrc: ObjectsRenderingService.getThumbnail.bind(ObjectsRenderingService)(
      project,
      item.object
    ),
  }));
};

type Props = {|
  project: gdProject,
  layout: gdLayout,
  onEditObject: (object: gdObject) => void,
  onEditObjectVariables: (object: gdObject) => void,
|};

const useObjectsListCommands = (props: Props) => {
  const { project, layout, onEditObject, onEditObjectVariables } = props;
  useCommandWithOptions('EDIT_OBJECT', true, {
    displayText: editObjectCommandText,
    generateOptions: React.useCallback(
      () => generateLayoutObjectsOptions(project, layout, onEditObject),
      [project, layout, onEditObject]
    ),
  });

  useCommandWithOptions('EDIT_OBJECT_VARIABLES', true, {
    displayText: editObjectVariablesCommandText,
    generateOptions: React.useCallback(
      () =>
        generateLayoutObjectsOptions(project, layout, onEditObjectVariables),
      [project, layout, onEditObjectVariables]
    ),
  });
};

export default useObjectsListCommands;
