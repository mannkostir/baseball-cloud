import AsyncSelect from 'react-select/async';

function ReactAsyncSelectInput<isMulti extends boolean = false>(
  props:
    | AsyncSelect<{ label: string; value: any }, isMulti>['props']
    | Record<string, any>
) {
  return <AsyncSelect {...props} />;
}

export default ReactAsyncSelectInput;
