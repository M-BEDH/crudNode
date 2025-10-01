function Student() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50 border bg-white p-4 rounded">
                <button className="btn btn-success mb-2">Add Student</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows go here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;