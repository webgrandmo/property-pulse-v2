export default function EnvSanityCheck() {
	return (
		<div>
			<h2>🔍 Env Variable Sanity Check</h2>
			<p>
				<strong>NEXTAUTH_URL:</strong> {process.env.NEXT_PUBLIC_DOMAIN}
			</p>
			<p>
				<strong>GOOGLE_CLIENT_ID:</strong>{' '}
				{process.env.GOOGLE_CLIENT_ID}
			</p>
		</div>
	);
}
