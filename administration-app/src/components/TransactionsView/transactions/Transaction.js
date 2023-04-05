import cn from '../css/Transactions.module.css';
import { parseDate } from './../../../services/TransactionsView/transactionsService';
import { Card } from '@mui/material';
export default function Transaction(arg) {
	return (
		<Card
			variant='outlined'
			sx={{
				marginInline: 2,
				marginTop: 2,
				borderRadius: 3,
				borderWidth: 1,
				borderColor: '#80808080',
			}}
		>
			<div className={cn.transaciton_root}>
				<table className={cn.table}>
					<tbody className={cn.tableBody}>
						<tr>
							<td className={cn.td}>{arg.prop.id}</td>
							<td className={cn.td}>{parseDate(arg.prop.dateTime)}</td>
							<td className={cn.td}>{arg.prop.recipient}</td>
							<td className={cn.td}>{arg.prop.amount}</td>
							<td className={cn.td}>{arg.prop.status}</td>
							<td className={cn.td}>
								<div className={cn.detailsBtnDiv}>
									<button
										className={cn.detailsBtn}
										onClick={() => {
											arg.setDetails(arg.prop);
										}}
									>
										<p className={cn.pNoMargin}>Details</p>
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Card>
	);
}
