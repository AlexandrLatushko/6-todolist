
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = {
    addItem: (title: string) => void
};
export const AddItemForm = ({addItem}: Props) => {

    const [itemTitle, setTaskTitle] = React.useState('')
	const [error, setError] = React.useState<string | null>(null)


    const addItemHandler = () => {
		if (itemTitle.trim() !== '') {
			addItem(itemTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}
    const addItemOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}

    const changeItemTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

    const buttonStyled = {
        maxWidth: '38px', 
        maxHeight: '38px', 
        minWidth: '38px',
        minHeight: '38px',
        background: 'blue'
    }

    return (
        
        <div>
            <TextField 
                error={!!error }
                className={error ? 'error' : ''}
                value={itemTitle }
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
                // helperText={error}
                id="outlined-basic" 
                size={'small'}
                label={error ? error : "type smth. pliase "} 
                variant="outlined" />

			{/* <input
				className={error ? 'error' : ''}
				value={itemTitle }
				onChange={changeItemTitleHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/> */}
			{/* <Button title={'+'} onClick={addItemHandler}/> */}
            <Button style={buttonStyled} onClick={addItemHandler} variant="contained">+</Button>
			{/* {error && <div className={'error-message'}>{error}</div>} */}
		</div>  
        
    );
};