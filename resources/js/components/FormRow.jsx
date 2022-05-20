function FormRow(props) {
    return (
        <tr>
            <td><label htmlFor={props.labelForId}>{props.label}:</label></td>
            <td>{props.children}</td>
        </tr>
    );
}

export default FormRow;
