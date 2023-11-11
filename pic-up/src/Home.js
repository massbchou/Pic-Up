function Home() {
    return (
        <div className="cover-container">
            <img src="/background.jpg" alt="background" class="h-100 w-100 position-absolute top-0 left-0 z-n1" />
            <div className="container text-center text-white">
                <h1>Welcome to <span className="text-primary fw-bold">Intro to React JS</span> workshop!</h1>
                <p className="lead">
                    <a href="#todo" className="btn btn-lg btn-primary">Go to Todo List</a>
                </p>
            </div>
        </div>
    )
}

export default Home;