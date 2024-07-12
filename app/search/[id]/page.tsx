import React from "react";

function SearchPage({ params: { id } }: { params: { id: string } }) {
    return <div>{id}</div>;
}

export default SearchPage;
