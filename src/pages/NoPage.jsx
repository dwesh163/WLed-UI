const NoPage = () => {
	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto h-12 w-12 text-primary"></div>
				<h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">Oops! Page Not Found</h1>
				<p className="mt-4 text-sm text-muted-foreground sm:text-base">The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.</p>
				<div className="mt-6">
					<a className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0.5" href="/">
						Go to Homepage
					</a>
				</div>
			</div>
		</div>
	);
};

export default NoPage;
