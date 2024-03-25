/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '4mb',
		},
	},
	images: {
		domains: ['via.placeholder.com', 'github.com'],
	},
};

module.exports = nextConfig;
