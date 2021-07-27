import TableCell from '@material-ui/core/TableCell';

const ConstCols = ({rows}) => {

    if(!rows) return null 
    return (
        <>
            {rows.map((row) =>
                <TableCell align="right">{row.title}</TableCell >
            )}
        </>
    );
}

export default ConstCols;