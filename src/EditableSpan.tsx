// @flow 
import * as React from 'react';
type Props = {
    oldTitle:string
    onClick:(updateTitle:string)=>void
};
export const EditableSpan = ({oldTitle,onClick}: Props) => {

    const [edit, setEdit] = React.useState<boolean>(false)
    const [updateTitle, setUpdateTitle] = React.useState(oldTitle)

    const onOffEdit = () => {
        setEdit(!edit)
        if(edit){
            onClick(updateTitle)
        }
    }

    const updateTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdateTitle(event.currentTarget.value)
	}

    return (
        edit 
        ? <input 
        value={updateTitle}
        onChange={updateTitleHandler}
        onBlur={onOffEdit}
        autoFocus
        />
        : <span onDoubleClick={onOffEdit}>{oldTitle}</span>
    );
};