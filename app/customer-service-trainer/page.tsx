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
import ComplaintTrainer from '@/components/ComplaintTrainer';
import CustomerPersona from '@/components/CustomerPersona';
import Evaluation from '@/components/Evaluation';
import ProductInformation from '@/components/ProductInformation';

function CustomerServiceTrainerPage() {
	const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
	const [customerPersona, setCustomerPersona] = useState<CustomerPersona | null>(null);
	const [productInformation, setProductInformation] = useState<ProductInformation | null>(null);
	const [evaluations, setEvaluations] = useState<(Evaluation | null)[]>([
		null,
		null,
		null,
		null,
		null,
	]);
	const [finalResponses, setFinalResponses] = useState<(string | null)[]>([
		null,
		null,
		null,
		null,
		null,
	]);
	const [finalGuidelines, setFinalGuidelines] = useState<(string | null)[]>([
		null,
		null,
		null,
		null,
		null,
	]);
	const [complaint, setComplaint] = useState<string | null>(null);
	const [evaluating, setEvaluating] = useState<boolean>(false);
	const setKEvaluation = (k: number) => {
		return (newEvaluation: Evaluation) => {
			const newEvaluations = [...evaluations];
			newEvaluations[k] = newEvaluation;
			setEvaluations(newEvaluations);
		};
	};
	const setKFinalResponses = (k: number) => {
		return (newFinalResponse: string) => {
			const newFinalResponses = [...finalResponses];
			newFinalResponses[k] = newFinalResponse;
			setFinalResponses(newFinalResponses);
		};
	};
	const setKFinalGuidelines = (k: number) => {
		return (newFinalGuidelinesInstance: string) => {
			const newFinalGuidelines = [...finalGuidelines];
			newFinalGuidelines[k] = newFinalGuidelinesInstance;
			setFinalGuidelines(newFinalGuidelines);
		};
	};
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
	const fetchKEvaluation = (k: number) => {
		return async () => {
			setEvaluating(true);

			const res = await evaluateResponse(
				companyProfile as CompanyProfile,
				customerPersona as CustomerPersona,
				productInformation as ProductInformation,
				complaint as string,
				finalResponses[k] as string,
			);
			setKEvaluation(k)(res);
			setEvaluating(false);
		};
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
				<ComplaintTrainer
					complaint={complaint}
					finalResponse={finalResponses[0]}
					fetchComplaint={fetchComplaint}
					customerName={customerPersona?.name as string}
					setFinalGuidelines={setKFinalGuidelines(0)}
					setFinalResponse={setKFinalResponses(0)}
				/>
			)}
			{[0, 1, 2, 3].map((i) => {
				return (
					<>
						{finalGuidelines[i] && (
							<Evaluation
								finalResponse={finalResponses[i] as string}
								evaluating={evaluating}
								evaluation={evaluations[i]}
								fetchEvaluation={fetchKEvaluation(i)}
							/>
						)}
						{evaluations[i] && (
							<ComplaintTrainer
								complaint={complaint}
								finalResponse={finalResponses[i + 1]}
								fetchComplaint={fetchComplaint}
								customerName={customerPersona?.name as string}
								setFinalGuidelines={setKFinalGuidelines(i + 1)}
								setFinalResponse={setKFinalResponses(i + 1)}
							/>
						)}
					</>
				);
			})}
			{finalGuidelines[4] && (
				<Evaluation
					finalResponse={finalResponses[4] as string}
					evaluating={evaluating}
					evaluation={evaluations[4]}
					fetchEvaluation={fetchKEvaluation(4)}
				/>
			)}
		</div>
	);
}

export default CustomerServiceTrainerPage;
