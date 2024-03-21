import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function ItemsTable({ items }) {
    return (
        <div className="form-control">
            <Box className='custom-box'>
                <Table  variant="striped" colorScheme="teal" >
                    <Thead>
                        <Tr>
                            <Th   fontWeight="bold" fontSize={16} color='darkblue' textTransform="none">Item</Th>
                            <Th   fontWeight="bold" fontSize={16} color='darkblue' textTransform="none">Calories</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.itemName}</Td>
                                <Td>{item.calories}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </div>
    );
}

export default ItemsTable;
