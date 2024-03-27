'use client';

import { useState } from 'react';

import {
	evaluateResponse,
	formulateComplaint,
	generateCompanyProfile,
	generateCustomerPersona,
	generateProductInformation,
} from '@/actions/chat';
import CompanyProfile from '@/components/CompanyProfile';
import Complaint from '@/components/Complaint';
import CustomerPersona from '@/components/CustomerPersona';
import Evaluation from '@/components/Evaluation';
import ProductInformation from '@/components/ProductInformation';

function CustomerServiceTrainerPage() {
	const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
	const [customerPersona, setCustomerPersona] = useState<CustomerPersona | null>(null);
	const [productInformation, setProductInformation] = useState<ProductInformation | null>(null);
	const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
	const [complaint, setComplaint] = useState<string | null>(null);

	const [finalResponse, setFinalResponse] = useState<string | null>(null);
	const [evaluating, setEvaluating] = useState<boolean>(false);
	const fetchCompanyProfile = async (spice: string) => {
		const res = await generateCompanyProfile(spice);
		setCompanyProfile(res);
	};
	const fetchCustomerPersona = async () => {
		const res = await generateCustomerPersona(companyProfile as CompanyProfile);
		setCustomerPersona(res);
	};
	const fetchProductInformation = async () => {
		const res = await generateProductInformation(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
		);
		setProductInformation(res);
	};
	const fetchComplaint = async () => {
		const res = await formulateComplaint(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
		);
		setComplaint(res);
	};
	const fetchEvaluation = async () => {
		setEvaluating(true);
		const res = await evaluateResponse(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
			complaint as string,
			finalResponse as string,
		);
		setEvaluation(res);
		setEvaluating(false);
	};
	return (
		<div className="flex flex-col gap-8">
			<CompanyProfile
				fetchCompanyProfile={fetchCompanyProfile}
				companyProfile={companyProfile}
			/>
			{companyProfile && (
				<CustomerPersona
					fetchCustomerPersona={fetchCustomerPersona}
					customerPersona={customerPersona}
				/>
			)}
			{customerPersona && (
				<ProductInformation
					productInformation={productInformation}
					fetchProductInformation={fetchProductInformation}
				/>
			)}
			{productInformation && (
				<Complaint
					complaint={complaint}
					fetchComplaint={fetchComplaint}
					customerName={customerPersona?.name as string}
					finalResponse={finalResponse}
					setFinalResponse={setFinalResponse}
				/>
			)}
			{finalResponse && (
				<Evaluation
					finalResponse={finalResponse}
					evaluating={evaluating}
					evaluation={evaluation}
					fetchEvaluation={fetchEvaluation}
				/>
			)}
		</div>
	);
}

export default CustomerServiceTrainerPage;
